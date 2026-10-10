// backend/routes/reviews.js
// Amazon & Flipkart Style Product Reviews & Ratings API

const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const memoryStore = require('../memoryStore');
const { optionalToken } = require('../middleware/auth');

/**
 * Helper to compute summary metrics and star distributions from a list of reviews
 */
function computeReviewSummary(reviews) {
  const totalReviews = reviews.length;
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let ratingSum = 0;

  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
    counts[star] = (counts[star] || 0) + 1;
    ratingSum += Number(r.rating) || 5;
  });

  const averageRating = totalReviews > 0 ? Number((ratingSum / totalReviews).toFixed(1)) : 5.0;

  const distribution = {};
  for (let s = 5; s >= 1; s--) {
    distribution[s] = {
      count: counts[s],
      percentage: totalReviews > 0 ? Math.round((counts[s] / totalReviews) * 100) : 0,
    };
  }

  return {
    averageRating,
    totalReviews,
    distribution,
  };
}

// ── GET /api/reviews/recent ──────────────────────────────────────────────────
// Returns store-wide recent reviews for testimonials & social proof
router.get('/recent', async (req, res) => {
  try {
    const [reviews] = await pool.execute(`
      SELECT 
        r.id, r.product_id, r.order_id, r.customer_name, r.rating, r.title, r.comment, r.is_verified, r.created_at,
        p.name AS product_name, p.image AS product_image, p.category AS product_category
      FROM product_reviews r
      LEFT JOIN products p ON r.product_id = p.id
      ORDER BY r.created_at DESC
      LIMIT 8
    `);

    return res.json({
      success: true,
      reviews,
    });
  } catch (err) {
    console.warn('[reviews] GET /recent MySQL offline, using memoryStore:', err.message);
    const memReviews = memoryStore.getReviews().slice(0, 8);
    return res.json({
      success: true,
      reviews: memReviews,
    });
  }
});

// ── GET /api/reviews ─────────────────────────────────────────────────────────
// Fetch reviews for a specific product or all products with summary stats
router.get('/', async (req, res) => {
  const { productId, limit = 50 } = req.query;

  try {
    let sql = `
      SELECT 
        r.id, r.product_id, r.order_id, r.user_id, r.customer_name, r.rating, r.title, r.comment, r.is_verified, r.created_at,
        p.name AS product_name, p.image AS product_image
      FROM product_reviews r
      LEFT JOIN products p ON r.product_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (productId && String(productId).trim()) {
      sql += ' AND r.product_id = ?';
      params.push(String(productId).trim());
    }

    sql += ' ORDER BY r.created_at DESC LIMIT ?';
    params.push(Math.min(100, Math.max(1, Number(limit) || 50)));

    const [reviews] = await pool.execute(sql, params);
    const summary = computeReviewSummary(reviews);

    return res.json({
      success: true,
      summary,
      count: reviews.length,
      reviews,
    });
  } catch (err) {
    console.warn('[reviews] GET / MySQL offline, using memoryStore:', err.message);
    const allMem = memoryStore.getReviews(productId);
    const summary = computeReviewSummary(allMem);

    return res.json({
      success: true,
      summary,
      count: allMem.length,
      reviews: allMem.slice(0, Number(limit) || 50),
    });
  }
});

// ── POST /api/reviews ────────────────────────────────────────────────────────
// Submit a new product review & rating (Amazon / Flipkart format)
router.post('/', optionalToken, async (req, res) => {
  const { productId, rating, comment, title, orderId, customerName } = req.body || {};

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'Product ID is required to submit a review.',
    });
  }

  const numRating = Number(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be an integer between 1 and 5 stars.',
    });
  }

  if (!comment || String(comment).trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Review comment must be at least 3 characters long.',
    });
  }

  const cleanProdId = String(productId).trim();
  const cleanComment = String(comment).trim();
  const cleanTitle = title ? String(title).trim() : '';

  // Determine author from JWT or submitted form
  const authorName = (req.user && req.user.name) || (customerName && String(customerName).trim()) || 'Verified Farmer';
  const authorUserId = (req.user && req.user.id) ? req.user.id : null;
  const cleanOrderId = orderId ? Number(orderId) : null;

  try {
    // 1. Insert review into product_reviews
    const [result] = await pool.execute(
      `INSERT INTO product_reviews (product_id, order_id, user_id, customer_name, rating, title, comment, is_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [cleanProdId, cleanOrderId, authorUserId, authorName, numRating, cleanTitle, cleanComment]
    );

    const newReview = {
      id: result.insertId,
      product_id: cleanProdId,
      order_id: cleanOrderId,
      user_id: authorUserId,
      customer_name: authorName,
      rating: numRating,
      title: cleanTitle,
      comment: cleanComment,
      is_verified: 1,
      created_at: new Date().toISOString(),
    };

    // 2. Re-calculate product's average rating and total review count in products table
    try {
      const [[stats]] = await pool.execute(
        'SELECT AVG(rating) AS avg_rating, COUNT(*) AS rev_count FROM product_reviews WHERE product_id = ?',
        [cleanProdId]
      );

      if (stats && stats.rev_count > 0) {
        const newAvg = Number(Number(stats.avg_rating).toFixed(1));
        const newCount = Number(stats.rev_count);

        await pool.execute(
          'UPDATE products SET rating = ?, reviews = ? WHERE id = ?',
          [newAvg, newCount, cleanProdId]
        );
      }
    } catch (metricErr) {
      console.warn('[reviews] Could not update product aggregate metrics in MySQL:', metricErr.message);
    }

    memoryStore.addReview(newReview);

    return res.status(201).json({
      success: true,
      message: 'धन्यवाद! Your review has been submitted and is now visible to other farmers.',
      review: newReview,
    });
  } catch (err) {
    console.warn('[reviews] POST / MySQL offline, saving to memoryStore:', err.message);

    const newReview = {
      id: Date.now(),
      product_id: cleanProdId,
      order_id: cleanOrderId,
      user_id: authorUserId,
      customer_name: authorName,
      rating: numRating,
      title: cleanTitle,
      comment: cleanComment,
      is_verified: 1,
      created_at: new Date().toISOString(),
    };

    memoryStore.addReview(newReview);

    return res.status(201).json({
      success: true,
      message: 'धन्यवाद! Your review has been submitted and is now visible to other farmers.',
      review: newReview,
    });
  }
});

module.exports = router;

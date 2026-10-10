// backend/setup-reviews.js
// Setup product_reviews table and initial seeds

const pool = require('./db');

async function setup() {
  console.log('Connecting to database...');

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS product_reviews (
      id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
      product_id    VARCHAR(10)    NOT NULL,
      order_id      INT UNSIGNED   DEFAULT NULL,
      user_id       INT UNSIGNED   DEFAULT NULL,
      customer_name VARCHAR(120)   NOT NULL,
      rating        TINYINT        NOT NULL,
      title         VARCHAR(255)   DEFAULT '',
      comment       TEXT           NOT NULL,
      is_verified   TINYINT(1)     NOT NULL DEFAULT 1,
      created_at    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_reviews_product (product_id),
      INDEX idx_reviews_order   (order_id),
      INDEX idx_reviews_user    (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;

  await pool.execute(createTableSQL);
  console.log('✓ Table product_reviews created or verified.');

  const sampleReviews = [
    {
      id: 1,
      product_id: 's1',
      order_id: 1,
      user_id: 1,
      customer_name: 'Arti Awari',
      rating: 5,
      title: 'उत्कृष्ट उगवण क्षमता! (Superb Germination)',
      comment: 'मी हे बी पेरले आणि 95% उगवण झाली. झाडांची वाढ खूप जोमदार आहे. सर्व शेतकरी मित्रांना नक्की शिफारस करतो!',
      is_verified: 1,
    },
    {
      id: 2,
      product_id: 's1',
      order_id: 2,
      user_id: 2,
      customer_name: 'Ramesh Patil',
      rating: 5,
      title: 'High yield certified seeds',
      comment: 'Delivered within 2 days in Baramati. Germination rate was excellent and boll formation is very healthy.',
      is_verified: 1,
    },
    {
      id: 3,
      product_id: 'f1',
      order_id: 3,
      user_id: 3,
      customer_name: 'Suresh More',
      rating: 5,
      title: '100% अस्सल गांडूळ खत',
      comment: 'मातीची सुपीकता सुधारण्यासाठी उत्तम खत. पिकांना लगेच हिरवेपणा आला.',
      is_verified: 1,
    },
    {
      id: 4,
      product_id: 'f2',
      order_id: 4,
      user_id: 1,
      customer_name: 'Arti Awari',
      rating: 4,
      title: 'Very effective foliar spray',
      comment: 'Dissolves instantly in water without any residue. Sprayed on cotton and saw noticeable difference in 4 days.',
      is_verified: 1,
    },
    {
      id: 5,
      product_id: 'p1',
      order_id: 1,
      user_id: 2,
      customer_name: 'Dnyaneshwar Jadhav',
      rating: 5,
      title: 'Natural organic pest protection',
      comment: 'Neem shield controlled aphids and sucking pests without harming beneficial insects. Good product.',
      is_verified: 1,
    },
  ];

  for (const r of sampleReviews) {
    await pool.execute(
      `INSERT IGNORE INTO product_reviews (id, product_id, order_id, user_id, customer_name, rating, title, comment, is_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [r.id, r.product_id, r.order_id, r.user_id, r.customer_name, r.rating, r.title, r.comment, r.is_verified]
    );
  }

  console.log('✓ Initial Amazon/Flipkart style sample reviews seeded.');
  process.exit(0);
}

setup().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});

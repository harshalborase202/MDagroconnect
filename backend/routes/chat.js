// backend/routes/chat.js
// AI Agronomist Chat API powered by Google Gemini

const express = require('express');
const https = require('https');
const router = express.Router();
const pool = require('../db');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `You are MD Agro Smart Agronomist, a friendly, practical, and helpful agricultural advisor for MD Agro Connect (एम. डी. अँग्रो सर्व्हिसेस).
Your mission is to help farmers, gardeners, and customers with crop health, fertilizer guidance, pest management, and store inquiries.

Guidelines:
1. Keep answers SHORT, SIMPLE, and DIRECT (2 to 3 bullet points, under 60 words total).
2. Give clear, actionable farming steps (e.g. immediate spray, soil feeding, water management).
3. Mention relevant MD Agro products when appropriate (such as: Organic Vermicompost, NPK 19:19:19, Neem Shield Bio-Pesticide, Fungicide Cure-All, Selective Herbicide, Battery Knapsack Sprayer, 3-in-1 pH Meter, Hybrid Seeds).
4. Reply in the same language the user asks in (Marathi, Hindi, or English).
5. Maintain a respectful, supportive, farmer-first tone.`;

function callGemini(contents) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents: contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 400,
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: '/v1beta/models/gemini-flash-lite-latest:generateContent?key=' + GEMINI_API_KEY,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            resolve(text);
          } catch (e) {
            reject(new Error('Failed to parse Gemini response'));
          }
        } else {
          reject(new Error(`Gemini API error status: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API request timed out'));
    });

    req.write(payload);
    req.end();
  });
}

// POST /api/chat
router.post('/', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'Message text is required.' });
  }

  try {
    // Format conversation history for Gemini API
    const contents = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach(turn => {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === 'bot' ? 'model' : 'user',
            parts: [{ text: turn.text }]
          });
        }
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const aiReply = await callGemini(contents);

    // Find any matching products from database to enhance response
    let recommendedProducts = [];
    try {
      const lower = (message + ' ' + aiReply).toLowerCase();
      const [allProducts] = await pool.query('SELECT id, name, price, unit, category, description, image FROM products');
      recommendedProducts = allProducts.filter(p => {
        const name = p.name.toLowerCase();
        return lower.includes(name) ||
               (lower.includes('vermicompost') && p.id === 'f1') ||
               (lower.includes('npk') && p.id === 'f2') ||
               (lower.includes('neem') && p.id === 'p1') ||
               (lower.includes('fungicide') && p.id === 'p2') ||
               (lower.includes('sprayer') && p.id === 't2') ||
               (lower.includes('ph') && p.id === 't3');
      }).slice(0, 2);
    } catch (dbErr) {
      // Non-fatal, return response without DB products
      console.warn('[chat] Could not query products from DB:', dbErr.message);
    }

    res.json({
      success: true,
      reply: aiReply,
      products: recommendedProducts
    });
  } catch (err) {
    console.error('[chat] Error processing AI chat:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to process AI response',
      error: err.message
    });
  }
});

module.exports = router;

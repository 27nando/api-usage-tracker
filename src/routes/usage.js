const express = require('express');
const router = express.Router();
const authenticateApiKey = require('../middleware/auth');
const db = require('../utils/db');

router.get('/protected-data', authenticateApiKey, async (req, res) => {
  const developer = req.developer;
  res.json({
    message: `Welcome ${developer.name}! You have access to protected data.`,
  });
});

// ✅ GET /api/usage — return usage logs for the developer
router.get('/usage', authenticateApiKey, async (req, res) => {
  try {
    const { id } = req.developer;

    const result = await db.query(
      `SELECT endpoint, method, status_code, response_time_ms, timestamp
       FROM usage_logs
       WHERE developer_id = $1
       ORDER BY timestamp DESC
       LIMIT 50`,
       [id]
    );

    res.json({ logs: result.rows });
  } catch (err) {
    console.error('Error fetching usage logs:', err);
    res.status(500).json({ error: 'Could not fetch usage data' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateApiKey = require('../middleware/auth');

router.get('/protected-data', authenticateApiKey, async (req, res) => {
  const developer = req.developer;
  res.json({
    message: `Welcome ${developer.name}! You have access to protected data.`,
  });
});

module.exports = router;

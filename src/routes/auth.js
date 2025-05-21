const express = require('express');
const router = express.Router();
const { createDeveloper, findByEmail } = require('../models/developer');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;                       // extracts registration details from the request body (JSON)

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing fields' });       // 400 : bad request
  }

  const existing = await findByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'Email already in use' }); // 400 : bad request
  }

  try {
    const dev = await createDeveloper({ name, email, password });
    res.status(201).json(dev);                                      // 201 : created
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });         // 500 : internal server error
  }
});

module.exports = router;

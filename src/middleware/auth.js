const db = require('../utils/db');          // connects to PostgreSQL

async function authenticateApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });          // 401 : unauthorized
  }

  try {
    const result = await db.query(
      'SELECT * FROM developers WHERE api_key = $1',
      [apiKey]
    );                                                                  // checks if api_key already exists
    const developer = result.rows[0];

    if (!developer) {
      return res.status(403).json({ error: 'Invalid API key' });        // 403 : invalid
    }

    req.developer = developer;                                          // attach the developer to the request
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to authenticate API key' });  // 500 : internal server error
  }
}

module.exports = authenticateApiKey;

const db = require('./db');

async function logUsage({ developerId, endpoint, method, statusCode, responseTime }) {
  try {
    await db.query(
      `INSERT INTO usage_logs (developer_id, endpoint, method, status_code, response_time_ms)
       VALUES ($1, $2, $3, $4, $5)`,
      [developerId, endpoint, method, statusCode, responseTime]
    );
  } catch (err) {
    console.error('Error logging usage:', err);
  }
}

module.exports = { logUsage };

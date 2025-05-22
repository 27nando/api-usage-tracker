const { logUsage } = require('../utils/logger');

function usageLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    if (!req.developer) return;                     // Don't log unauthenticated traffic

    const duration = Date.now() - start;
    logUsage({
      developerId: req.developer.id,
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: duration
    });
  });

  next();
}

module.exports = usageLogger;

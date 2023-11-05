import rateLimit from 'express-rate-limit';

/**
 * rateLimiter
 * express-rate-limit config
 * @returns {Function} Rate limiter
 */
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // 1K requests / 1 window
  standardHeaders: false,
  legacyHeaders: false,
});

export default rateLimiter;

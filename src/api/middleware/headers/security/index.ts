import { Request, Response, NextFunction } from 'express';

/**
 * Global middleware, ensures myriads of imperative security headers.
 * - `HSTS` - 1 Year
 * - `X-Frame-Options` - Clickjacking
 * - `X-Content-Type-Options` - Content-Type headers should be followed
 * @param {Express.Request} req Request object
 * @param {Express.Response} res Response object
 * @returns {Function} next()
 */
const security = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
};

export default security;

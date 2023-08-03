import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

const { API_KEY } = process.env;

/**
 * checkApiKey
 * Check that the x-api-key header is valid
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Callback function
 * @returns {Express.Response} next() or 401 status and error message
 */
const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const { 'x-api-key': xApiKey } = req.headers;

  if (!xApiKey || xApiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorised' });
  }

  next();
};

export default checkApiKey;

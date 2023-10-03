import { Request, Response } from '../../../types';

/**
 * Global middleware that sets the `X-Robots-Tag` header in the response object to prevent search engines from indexing or following the page.
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @param {Function} next - The callback function to be called to continue the request handling.
 * @returns {void} - This function does not return any value.
 */
export const seo = (req: Request, res: Response, next: () => void) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex, nosnippet');
  next();
};

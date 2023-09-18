import { Request, Response } from '../../../types';
import { PRODUCT } from '../../content-strings';

/**
 * Sets the meta information in the response object.
 * @param req - The request object containing information about the HTTP request.
 * @param res - The response object used to send the HTTP response.
 * @param next - The next function to be called after setting the `res.locals.meta` property.
 */
export const meta = (req: Request, res: Response, next: () => void) => {
  // Set the meta information in res.locals
  res.locals.meta = {
    url: `${req.hostname}${req.originalUrl}`,
    title: PRODUCT.DESCRIPTION.GENERIC,
    organisation: PRODUCT.DESCRIPTION.ORGANISATION,
  };

  // Call the next function
  next();
};

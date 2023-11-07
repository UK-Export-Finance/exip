import { Request, Response } from '../../../types';
import { INTEGRITY } from '../../constants';

const { JS, GOVUK, FORM, COOKIES, GA, MOJ, ACCESSIBILITY } = INTEGRITY;

/**
 * Middleware function that adds integrity values to the res.locals.SRI object.
 * These integrity values are used for sub resource Integrity (SRI) checks in web applications.
 *
 * @param req - The request object containing information about the incoming HTTP request.
 * @param res - The response object used to send the HTTP response.
 * @param next - A callback function to pass control to the next middleware function.
 */
export const integrity = (req: Request, res: Response, next: () => void) => {
  const SRI = {
    JS,
    ACCESSIBILITY,
    MOJ,
    GOVUK,
    FORM,
    COOKIES,
    GA,
  };

  res.locals.SRI = SRI;

  next();
};

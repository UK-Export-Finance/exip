import { parseISO, isAfter } from 'date-fns';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, Response } from '../../../../types';

const {
  ACCOUNT: { SIGNED_OUT },
} = INSURANCE_ROUTES;

/**
 * userSessionMiddleware
 * If the current time is past the session expiry time
 * delete the user session and redirect to the "signed out" page.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Request.Next} Request next or response redirect
 */
export const userSessionMiddleware = async (req: Request, res: Response, next: Next) => {
  if (req.session.user) {
    const { expires } = req.session.user;

    const now = new Date();
    const expiresDate = parseISO(expires);

    if (isAfter(now, expiresDate)) {
      delete req.session.user;

      return res.redirect(SIGNED_OUT);
    }

    return next();
  }

  return next();
};

export default userSessionMiddleware;

import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

/**
 * get
 * Account sign out / wipe user session
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Redirect to sign in page
 */
export const get = (req: Request, res: Response) => {
  delete req.session.user;

  req.flash('importantBanner', 'successfulSignOut');
  return res.redirect(SIGN_IN_ROOT);
};

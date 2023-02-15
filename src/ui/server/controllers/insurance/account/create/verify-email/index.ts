import api from '../../../../../api';
import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';

const {
  INSURANCE: {
    ACCOUNT: { CREATE, SIGN_IN },
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES;

/**
 * get
 * Call the API to verify the token passed in the request query
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Sign in or link expired page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (token) {
      const response = await api.keystone.account.verifyEmailAddress(token);

      if (response.success) {
        req.flash('successBanner', 'newAccountVerified');

        return res.redirect(SIGN_IN.ROOT);
      }

      return res.redirect(CREATE.VERIFY_EMAIL_LINK_EXPIRED);
    }

    return res.redirect(CREATE.VERIFY_EMAIL_LINK_EXPIRED);
  } catch (err) {
    console.error('Error verifying account email address', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

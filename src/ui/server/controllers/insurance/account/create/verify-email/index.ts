import api from '../../../../../api';
import { ROUTES } from '../../../../../constants';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import { Request, Response } from '../../../../../../types';

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { VERIFY_EMAIL_LINK_INVALID, VERIFY_EMAIL_LINK_EXPIRED },
      SIGN_IN,
    },
    PROBLEM_WITH_SERVICE,
  },
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
      const sanitisedToken = String(sanitiseValue({ value: token }));

      const response = await api.keystone.account.verifyEmailAddress(sanitisedToken);

      if (response.expired && response.accountId) {
        const url = `${VERIFY_EMAIL_LINK_EXPIRED}?id=${response.accountId}`;

        return res.redirect(url);
      }

      if (response.invalid || !response.success) {
        return res.redirect(VERIFY_EMAIL_LINK_INVALID);
      }

      if (response.success) {
        req.flash('successBanner', 'newAccountVerified');

        return res.redirect(SIGN_IN.ROOT);
      }

      return res.redirect(VERIFY_EMAIL_LINK_INVALID);
    }

    return res.redirect(VERIFY_EMAIL_LINK_INVALID);
  } catch (err) {
    console.error('Error verifying account email address %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

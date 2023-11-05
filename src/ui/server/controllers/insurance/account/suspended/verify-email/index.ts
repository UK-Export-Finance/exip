import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: {
    SUSPENDED: { ROOT: SUSPENDED_ROOT, VERIFY_EMAIL_EXPIRED_LINK, VERIFY_EMAIL_INVALID_LINK },
    REACTIVATED_ROOT,
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

/**
 * get
 * Verify the token is valid and if so, redirect to the Account reactivated page.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Account reactivated page or expired link page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.redirect(SUSPENDED_ROOT);
    }

    const sanitisedToken = String(sanitiseValue({ value: token }));

    const response = await api.keystone.account.verifyAccountReactivationToken(sanitisedToken);

    if (response.expired && response.accountId) {
      const url = `${VERIFY_EMAIL_EXPIRED_LINK}?id=${response.accountId}`;

      return res.redirect(url);
    }

    if (response.invalid || !response.success) {
      return res.redirect(VERIFY_EMAIL_INVALID_LINK);
    }

    return res.redirect(REACTIVATED_ROOT);
  } catch (err) {
    console.error('Error verifying account password reset token %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: {
    SUSPENDED: { ROOT: SUSPENDED_ROOT, VERIFY_EMAIL_LINK_EXPIRED, VERIFY_EMAIL_LINK_INVALID },
    REACTIVATED_ROOT,
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

/**
 * get
 * Verify the token is valid and if so, redirect to the Account reactivated page.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Account reactivated page or link expired page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.redirect(SUSPENDED_ROOT);
    }

    const response = await api.keystone.account.verifyAccountReactivationToken(token);

    if (response.expired && response.accountId) {
      const url = `${VERIFY_EMAIL_LINK_EXPIRED}?id=${response.accountId}`;

      return res.redirect(url);
    }

    if (response.invalid || !response.success) {
      return res.redirect(VERIFY_EMAIL_LINK_INVALID);
    }

    return res.redirect(REACTIVATED_ROOT);
  } catch (err) {
    console.error('Error verifying account password reset token', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

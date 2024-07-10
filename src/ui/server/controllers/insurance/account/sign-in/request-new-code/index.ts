import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
    },
    DASHBOARD,
  },
} = ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE;

/**
 * get
 * Render the Request a new access code page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Request a new access code page
 */
export const get = (req: Request, res: Response) => {
  if (req.session.user?.id) {
    /**
     * User is already signed in.
     * Redirect to the dashboard.
     */
    return res.redirect(DASHBOARD);
  }

  if (!req.session.accountId) {
    /**
     * No account ID is in the session.
     * We cannot make an API call in the POST without this.
     * Therefore, redirect to the sign in route.
     */
    return res.redirect(SIGN_IN_ROOT);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
};

/**
 * post
 * Get a new sign in code and redirect to the next part of the flow
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  try {
    if (!req.session.accountId) {
      return res.redirect(SIGN_IN_ROOT);
    }

    const response = await api.keystone.account.signInSendNewCode(req.session.accountId);

    if (response.success) {
      req.flash('successBanner', 'newSecurityCodeSent');

      return res.redirect(ENTER_CODE);
    }
  } catch (err) {
    console.error('Error verifying account sign in code %O', err);
    return res.redirect(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE);
  }
};

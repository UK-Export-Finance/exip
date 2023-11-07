import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT },
  },
} = ROUTES.INSURANCE;

/**
 * get
 * Render the "Password reset - success" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Password reset - success" page
 */
export const get = (req: Request, res: Response) => {
  const { passwordResetSuccess } = req.session;

  /**
   * Add the success flag to req.flash
   * This prevents an issue where the success flag will be undefined if:
   * - The page is refreshed
   * - A user navigates away and comes back to the page
   */
  req.flash('passwordResetSuccess', String(passwordResetSuccess));

  const success = passwordResetSuccess ?? req.flash('passwordResetSuccess');

  if (!success) {
    return res.redirect(PASSWORD_RESET_ROOT);
  }

  delete req.session.passwordResetSuccess;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    SIGN_IN_URL: SIGN_IN_ROOT,
  });
};

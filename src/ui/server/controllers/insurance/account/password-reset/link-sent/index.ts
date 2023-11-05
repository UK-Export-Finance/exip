import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_SENT;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_SENT;

/**
 * get
 * Render the "Password reset - link sent" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Password reset - link sent" page
 */
export const get = (req: Request, res: Response) => {
  const { emailAddressForPasswordReset } = req.session;

  /**
   * Add the email to req.flash
   * This prevents an issue where the email will be undefined if:
   * - The page is refreshed
   * - A user navigates away and comes back to the page
   */
  req.flash('emailAddressForPasswordReset', emailAddressForPasswordReset);

  const accountEmail = emailAddressForPasswordReset ?? req.flash('emailAddressForPasswordReset');

  if (!accountEmail) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  delete req.session.emailAddressForPasswordReset;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    accountEmail,
  });
};

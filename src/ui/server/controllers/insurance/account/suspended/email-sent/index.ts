import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { CUSTOMER_SERVICE_CONTACT_DETAILS } from '../../../../../content-strings/contact';
import { Request, Response } from '../../../../../../types';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT;

/**
 * get
 * Render the "Reactivate account - email sent" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Reactivate account - email sent" page
 */
export const get = (req: Request, res: Response) => {
  const { emailAddressForAccountReactivation } = req.session;

  /**
   * Add the email to req.flash
   * This prevents an issue where the email will be undefined if:
   * - The page is refreshed
   * - A user navigates away and comes back to the page
   */
  req.flash('emailAddressForAccountReactivation', emailAddressForAccountReactivation);

  const accountEmail = emailAddressForAccountReactivation ?? req.flash('emailAddressForAccountReactivation');

  if (!accountEmail) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  delete req.session.emailAddressForAccountReactivation;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    accountEmail,
    CUSTOMER_SERVICE_CONTACT_DETAILS,
  });
};

import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL,
  ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT,
};

/**
 * get
 * Call API to send "confirm email" email and render the Confirm email resent page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Confirm email resent page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    let email;

    if (id) {
      const exporter = await api.keystone.account.sendEmailConfirmEmailAddress(id);

      if (!exporter.success) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      email = exporter.emailRecipient;
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      email,
      exporterId: id,
    });
  } catch (err) {
    console.error("Error sending new email verification for account creation and rendering 'new link sent' page", { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

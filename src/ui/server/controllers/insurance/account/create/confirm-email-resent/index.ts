import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL,
  ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT,
};

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * get
 * Call API to get an account's email and render the "confirm email resent" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Confirm email resent page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const sanitisedId = String(sanitiseValue({ value: id }));

    const accountResponse = await api.keystone.account.get(sanitisedId);

    if (accountResponse?.email) {
      const accountEmail = accountResponse.email;

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: `${req.headers.referer}?id=${sanitisedId}`,
        }),
        userName: getUserNameFromSession(req.session.user),
        accountEmail,
        accountId: sanitisedId,
      });
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error("Error getting account and rendering 'confirm email resent' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

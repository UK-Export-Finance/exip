import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL,
  ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT,
};

/**
 * get
 * Render the "confirm email resent" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Confirm email resent page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const accountResponse = await api.keystone.account.get(id);

    let accountEmail;

    if (accountResponse && accountResponse.email) {
      accountEmail = accountResponse.email;
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: `${req.headers.referer}?id=${id}`,
      }),
      userName: getUserNameFromSession(req.session.user),
      accountEmail,
      accountId: id,
    });
  } catch (err) {
    console.error("Error getting account and rendering 'confirm email resent' page", { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

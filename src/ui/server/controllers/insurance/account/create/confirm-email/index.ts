import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * get
 * Render the Confirm email page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Confirm email page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { accountIdToConfirm } = req.session;

    let sanitisedId;

    if (req.query.id) {
      sanitisedId = String(sanitiseValue({ value: req.query.id }));
    }

    const accountId = accountIdToConfirm ?? sanitisedId;

    if (!accountId) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    delete req.session.accountIdToConfirm;

    let accountEmail;

    if (accountId) {
      const account = await api.keystone.account.get(accountId);

      accountEmail = account.email;
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      accountEmail,
      accountId,
    });
  } catch (err) {
    console.error("Error getting exporter by email and rendering 'confirm email' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

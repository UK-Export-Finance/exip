import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: { EMAIL: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  PROBLEM_WITH_SERVICE,
  ACCOUNT: {
    SUSPENDED: { EMAIL_SENT },
  },
} = ROUTES.INSURANCE;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SUSPENDED.ROOT;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.ROOT;

/**
 * get
 * Render the Account suspended page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Account suspended page
 */
export const get = (req: Request, res: Response) => {
  delete req.session.user;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
  });
};

export const post = async (req: Request, res: Response) => {
  try {
    console.info('Posting account suspended form');

    const urlOrigin = req.headers.origin;

    if (!req.query.id) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const response = await api.keystone.account.sendEmailReactivateAccountLink(urlOrigin, req.query.id);

    if (response.success) {
      // store the email address in local session, for consumption in the next part of the flow.
      req.session.emailAddressForAccountReactivation = response.email;

      return res.redirect(EMAIL_SENT);
    }
  } catch (err) {
    console.error('Error posting account suspended form', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

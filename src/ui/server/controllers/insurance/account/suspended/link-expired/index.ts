import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { replaceCharactersWithCharacterCode } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: {
    SUSPENDED: { ROOT: SUSPENDED_ROOT, EMAIL_SENT },
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_EXPIRED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_EXPIRED;

/**
 * get
 * Render the "Reactivate account - link expired" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Reactivate account - link expired" page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
  });

export const post = async (req: Request, res: Response) => {
  try {
    console.info('Posting reactivate account - link expired form');

    const urlOrigin = req.headers.origin;

    if (!req.query.id) {
      return res.redirect(SUSPENDED_ROOT);
    }

    const sanitisedId = replaceCharactersWithCharacterCode(req.query.id);

    const response = await api.keystone.account.sendEmailReactivateAccountLink(urlOrigin, sanitisedId);

    if (response.success) {
      /**
       * Store the email address in local session,
       * for consumption in the next part of the flow.
       */
      req.session.emailAddressForAccountReactivation = response.email;

      return res.redirect(EMAIL_SENT);
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error('Error posting reactivate account - link expired form', { err });
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

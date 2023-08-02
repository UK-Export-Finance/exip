import { ROUTES, TEMPLATES } from '../../../../../constants';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * get
 * Verify email link expired page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Verify email link expired page
 */
export const get = (req: Request, res: Response) => {
  try {
    if (!req.query.id) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { id } = req.query;

    const sanitisedId = String(sanitiseValue({ value: id }));

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: `${CONFIRM_EMAIL}?id=${sanitisedId}`,
      }),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (err) {
    console.error("Error rendering 'verify email link expired' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

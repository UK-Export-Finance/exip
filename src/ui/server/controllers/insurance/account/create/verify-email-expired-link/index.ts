import { ROUTES, TEMPLATES } from '../../../../../constants';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * get
 * Verify email expired link page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Verify email expired link page
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
    console.error("Error rendering 'verify email expired link' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Submit verify email expired link page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Confirm email resent page or problem with service page
 */
export const post = async (req: Request, res: Response) => {
  try {
    if (!req.query.id) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { id } = req.query;

    if (!id) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const urlOrigin = `https://${req.headers.host}`;

    const sanitisedId = String(sanitiseValue({ value: id }));

    const response = await api.keystone.account.sendEmailConfirmEmailAddress(urlOrigin, sanitisedId);

    if (response.success) {
      return res.redirect(`${CONFIRM_EMAIL_RESENT}?id=${sanitisedId}`);
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error("Error rendering 'verify email expired link' page %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

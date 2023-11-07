import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.MANAGE;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.MANAGE;

/**
 * get
 * Render the Manage your account page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Manage your account page
 */
export const get = (req: Request, res: Response) => {
  if (!req.session.user?.id) {
    return res.redirect(SIGN_IN_ROOT);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
};

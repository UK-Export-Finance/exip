import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    ACCOUNT: { SIGN_IN },
  },
} = ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SIGNED_OUT;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGNED_OUT;

/**
 * get
 * Render the Signed out page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Signed out page
 */
export const get = (req: Request, res: Response) => {
  delete req.session.user;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    SIGN_IN_LINK: SIGN_IN.ROOT,
    userName: getUserNameFromSession(req.session.user),
  });
};

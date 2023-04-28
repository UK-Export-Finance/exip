import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED;

/**
 * get
 * Render the "Password reset - link expired" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Password reset - link expired" page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
  });

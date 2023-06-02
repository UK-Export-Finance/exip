import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.SUSPENDED;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED;

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

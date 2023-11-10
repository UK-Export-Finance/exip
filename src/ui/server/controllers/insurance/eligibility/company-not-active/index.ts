import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.COMPANY_NOT_ACTIVE;

/**
 * get
 * Render the "Company not active" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Company not active page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.COMPANY_NOT_ACTIVE,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });

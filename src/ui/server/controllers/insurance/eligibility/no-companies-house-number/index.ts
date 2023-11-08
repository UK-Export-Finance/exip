import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER;

/**
 * get
 * Render the "No Companies House number" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} No Companies House number page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });

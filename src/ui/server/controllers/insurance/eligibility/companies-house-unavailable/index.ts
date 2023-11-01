import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: { ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE;

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE;

/**
 * get
 * Render the "Companies house unavailable" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Companies house unavailable page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    TRY_AGAIN_HREF: ENTER_COMPANIES_HOUSE_NUMBER,
  });

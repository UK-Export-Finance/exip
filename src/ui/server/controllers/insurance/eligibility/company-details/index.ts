import { TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { companiesHouseSummaryList } from '../../../../helpers/summary-lists/companies-house';
import { Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY, NEED_TO_START_AGAIN, ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS;

/**
 * get
 * Render the "Company details" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Company details page
 */
export const get = (req: Request, res: Response) => {
  if (!req.session.submittedData.insuranceEligibility.company) {
    return res.redirect(NEED_TO_START_AGAIN);
  }

  const { company } = req.session.submittedData.insuranceEligibility;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    SUMMARY_LIST: companiesHouseSummaryList(company),
    DIFFERENT_COMPANIES_HOUSE_NUMBER_URL: ENTER_COMPANIES_HOUSE_NUMBER,
  });
};

/**
 * post
 * Post the "Company details" form
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => res.redirect(BUYER_COUNTRY);

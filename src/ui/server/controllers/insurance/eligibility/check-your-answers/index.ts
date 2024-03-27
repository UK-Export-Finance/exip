import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response, InsuranceEligibility } from '../../../../../types';
import { eligibilitySummaryList } from '../../../../helpers/summary-lists/eligibility';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';

const { ELIGIBLE_TO_APPLY_ONLINE } = INSURANCE_ROUTES.ELIGIBILITY;

export const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS;

const { HAS_REVIEWED_ELIGIBILITY } = INSURANCE_FIELD_IDS.ELIGIBILITY;

/**
 * get
 * Render the "Check your answers" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Check your answers page
 */
export const get = (req: Request, res: Response) => {
  const summaryList = eligibilitySummaryList(req.session.submittedData.insuranceEligibility as InsuranceEligibility);

  return res.render(TEMPLATE, {
    ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    userName: getUserNameFromSession(req.session.user),
    SUMMARY_LIST: summaryList,
  });
};

/**
 * post
 * Check for validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  const update = {
    [HAS_REVIEWED_ELIGIBILITY]: true,
  };

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData(update, req.session.submittedData.insuranceEligibility),
  };

  return res.redirect(ELIGIBLE_TO_APPLY_ONLINE);
};

import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { yourBusinessSummaryLists } from '../../../../helpers/summary-lists/your-business';
import { Request, ResponseInsurance } from '../../../../../types';

const { CHECK_YOUR_ANSWERS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = CHECK_YOUR_ANSWERS_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

/**
 * Get the application and render Business - check your answers page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Business - check your answers page
 */
const get = (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    const { company, business, referenceNumber } = application;

    const summaryLists = yourBusinessSummaryLists({ business, company, referenceNumber });

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: CHECK_YOUR_ANSWERS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      SUMMARY_LISTS: summaryLists,
    });
  } catch (error) {
    console.error('Error getting check your answers %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow
 */
const post = (req: Request, res: ResponseInsurance) => {
  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
};

export { get, post };

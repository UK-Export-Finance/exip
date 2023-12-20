import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { yourBusinessSummaryLists } from '../../../../helpers/summary-lists/your-business';
import requiredFields from '../../../../helpers/required-fields/business';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

export const FIELD_ID = FIELD_IDS.CHECK_YOUR_ANSWERS.EXPORTER_BUSINESS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUYER, YOUR_BUSINESS_SAVE_AND_BACK },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS_SAVE_AND_BACK}`,
});

/**
 * get
 * Render the check your answers your buyer page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers your buyer
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, company, business } = application;

    const checkAndChange = true;

    const summaryList = yourBusinessSummaryLists(company, business, referenceNumber, checkAndChange);

    const exporterFields = requiredFields(company.hasDifferentTradingName);

    const status = sectionStatus(exporterFields, application);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      status,
      SUMMARY_LIST: summaryList,
      ...pageVariables(referenceNumber),
    });
  } catch (err) {
    console.error('Error getting check your answers - policy %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Save data and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  try {
    // save the application
    const payload = constructPayload(req.body, [FIELD_ID]);

    const saveResponse = await save.sectionReview(application, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`);
  } catch (err) {
    console.error('Error updating check your answers - your business %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

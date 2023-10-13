import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import CHECK_YOUR_ANSWERS_FIELD_IDS from '../../../../constants/field-ids/insurance/check-your-answers';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { eligibilitySummaryList } from '../../../../helpers/summary-lists/eligibility';
import requiredFields from '../../../../helpers/required-fields/eligibility';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

export const FIELD_ID = CHECK_YOUR_ANSWERS_FIELD_IDS.ELIGIBILITY;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { START_NEW_APPLICATION, TYPE_OF_POLICY },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * pageVariables
 * Page fields and "start new application" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
  START_NEW_APPLICATION: `${INSURANCE_ROOT}/${referenceNumber}${START_NEW_APPLICATION}`,
  renderNotificationBanner: true,
  eligibility: true,
});

/**
 * get
 * Render the check your answers eligibility page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers eligibility page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const summaryList = eligibilitySummaryList({
      ...application.eligibility,
      ...application.policy,
    });

    const fields = requiredFields();

    const status = sectionStatus(fields, application);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      status,
      SUMMARY_LIST: summaryList,
      ...pageVariables(application.referenceNumber),
    });
  } catch (err) {
    console.error('Error getting check your answers - eligibility %O', err);
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

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`);
  } catch (err) {
    console.error('Error updating check your answers - policy and exports %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

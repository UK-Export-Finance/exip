import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { yourBuyerSummaryList } from '../../../../helpers/summary-lists/your-buyer';
import requiredFields from '../../../../helpers/required-fields/your-buyer';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

export const FIELD_ID = FIELD_IDS.CHECK_YOUR_ANSWERS.BUYER;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUYER_SAVE_AND_BACK, TYPE_OF_POLICY },
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
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER_SAVE_AND_BACK}`,
});

/**
 * get
 * Render the Check your answers - Your buyer page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Check your answers - Your buyer page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const checkAndChange = true;

    const summaryList = yourBuyerSummaryList(
      application.buyer,
      application.eligibility,
      referenceNumber,
      application.totalContractValueOverThreshold,
      checkAndChange,
    );

    const fields = requiredFields({});

    const status = sectionStatus(fields, application);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      status,
      SUMMARY_LISTS: summaryList,
      ...pageVariables(referenceNumber),
    });
  } catch (err) {
    console.error('Error getting Check your answers - Your buyer %O', err);
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
    console.error('Error updating Check your answers - Your buyer %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

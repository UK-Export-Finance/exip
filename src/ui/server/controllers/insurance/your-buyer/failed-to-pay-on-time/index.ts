import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/buyer-trading-history';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { FAILED_TO_PAY_SAVE_AND_BACK: SAVE_AND_BACK, CHECK_YOUR_ANSWERS, CREDIT_INSURANCE_COVER, BUYER_FINANCIAL_INFORMATION },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { FAILED_PAYMENTS } = YOUR_BUYER_FIELD_IDS;

export const FIELD_ID = FAILED_PAYMENTS;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.FAILED_PAYMENTS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID,
  PAGE_CONTENT_STRINGS,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
  FIELD_HINT: FIELDS[FIELD_ID].HINT,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

/**
 * get
 * Render the failed to pay on time page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Failed to pay on time page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const {
      referenceNumber,
      buyer: { buyerTradingHistory },
    } = application;

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...pageVariables(referenceNumber),
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      applicationAnswer: buyerTradingHistory[FIELD_ID],
    });
  } catch (error) {
    console.error('Error getting failed to pay on time %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check failed to pay on time validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, totalContractValueOverThreshold } = application;

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...singleInputPageVariables({
          ...pageVariables(referenceNumber),
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: payload,
        validationErrors,
      });
    }

    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If is a change route
     * redirect to CHECK_YOUR_ANSWERS
     */
    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If is a check-and-change route
     * redirect to CHECK_AND_CHANGE_ROUTE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * if totalContractValue is over the threshold
     * redirect to CREDIT_INSURANCE_COVER
     * otherwise it should redirect to the BUYER_FINANCIAL_INFORMATION page
     */
    if (totalContractValueOverThreshold) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`);
  } catch (error) {
    console.error('Error posting failed to pay on time %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

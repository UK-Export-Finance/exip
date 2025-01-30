import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/buyer-trading-history';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    TRADING_HISTORY_SAVE_AND_BACK: SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    CURRENCY_OF_LATE_PAYMENTS,
    FAILED_TO_PAY,
    CURRENCY_OF_LATE_PAYMENTS_CHANGE,
    CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE,
    FAILED_TO_PAY_CHANGE,
    FAILED_TO_PAY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { OUTSTANDING_PAYMENTS, FAILED_PAYMENTS } = YOUR_BUYER_FIELD_IDS;

export const FIELD_ID = OUTSTANDING_PAYMENTS;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
  FIELD_HINT: FIELDS[OUTSTANDING_PAYMENTS].HINT,
});

/**
 * get
 * Render the trading history page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Trading history page
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(referenceNumber),
      submittedValues: application.buyer.buyerTradingHistory,
    });
  } catch (error) {
    console.error('Error getting trading history with the buyer %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check trading history validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const {
      referenceNumber,
      buyer: { buyerTradingHistory },
    } = application;

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(referenceNumber),
        submittedValues: payload,
        validationErrors,
      });
    }

    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const answer = payload[FIELD_ID];

    const hasTradingHistory = answer === 'true';
    const hasNoFailedPayments = buyerTradingHistory[FAILED_PAYMENTS] === null;

    /**
     * If the route is a "change" route,
     * the exporter has hasTradingHistory,
     * redirect to CURRENCY_OF_LATE_PAYMENTS_CHANGE
     * if the exporter has hasNoFailedPayments (FAILED_PAYMENTS has not yet been submitted)
     * redirect to FAILED_TO_PAY_CHANGE
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isChangeRoute(req.originalUrl)) {
      if (hasTradingHistory) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS_CHANGE}`);
      }

      if (hasNoFailedPayments) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If the route is a "check-and-change" route,
     * the exporter has hasTradingHistory,
     * redirect to CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE
     * if the exporter has hasNoFailedPayments (FAILED_PAYMENTS has not yet been submitted)
     * redirect to FAILED_TO_PAY_CHECK_AND_CHANGE
     * Otherwise, redirect to CHECK_AND_CHANGE_ROUTE.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (hasTradingHistory) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`);
      }

      if (hasNoFailedPayments) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * if hasTradingHistory is true
     * then should redirect to CURRENCY_OF_LATE_PAYMENTS
     */
    if (hasTradingHistory) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY}`);
  } catch (error) {
    console.error('Error posting trading history with the buyer %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/buyer-trading-history';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';
import isChangeRoute from '../../../../helpers/is-change-route';

const { TRADED_WITH_BUYER } = BUYER_FIELD_IDS;

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    TRADED_WITH_BUYER_SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    TRADING_HISTORY,
    TRADING_HISTORY_CHANGE,
    TRADING_HISTORY_CHECK_AND_CHANGE,
    CREDIT_INSURANCE_COVER,
    BUYER_FINANCIAL_INFORMATION,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

export const FIELD_ID = TRADED_WITH_BUYER;

export const FIELD_IDS = [FIELD_ID];

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADED_WITH_BUYER;

/**
 * get
 * Render the traded with buyer page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Traded with buyer page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(application.referenceNumber),
      submittedValues: application.buyer.buyerTradingHistory,
    });
  } catch (error) {
    console.error('Error getting insurance - your buyer - traded with buyer %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check traded with buyer validation errors and if successful, redirect to the next part of the flow.
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

    const { referenceNumber } = req.params;
    const { body } = req;

    const payload = constructPayload(body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        submittedValues: payload,
        application: mapApplicationToFormFields(application),
        validationErrors,
      });
    }

    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const answer = payload[FIELD_ID];

    const hasTradedWithBuyer = answer === 'true';
    const hasNotTradedWithBuyer = answer === 'false';

    /**
     * If is a change route
     * the exporter has TRADED_WITH_BUYER,
     * redirect to TRADING_HISTORY CHANGE.
     * redirect to CHECK_YOUR_ANSWERS
     */
    if (isChangeRoute(req.originalUrl)) {
      if (hasTradedWithBuyer) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If is a check-and-change route,
     * the exporter has TRADED_WITH_BUYER,
     * redirect to TRADING_HISTORY_CHECK_AND_CHANGE.
     * Otherwise, redirect to CHECK_AND_CHANGE_ROUTE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (hasTradedWithBuyer) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * if exporterHasTradedWithBuyer is true
     * redirect to prior trading history page
     */
    if (hasTradedWithBuyer) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`);
    }

    /**
     * if totalContractValue is over the threshold and payload answer is false
     * then should redirect to CREDIT_INSURANCE_COVER
     * otherwise it should redirect to the BUYER_FINANCIAL_INFORMATION page
     */
    if (application.totalContractValueOverThreshold && hasNotTradedWithBuyer) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`);
  } catch (error) {
    console.error('Error posting insurance - your buyer - traded with buyer %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

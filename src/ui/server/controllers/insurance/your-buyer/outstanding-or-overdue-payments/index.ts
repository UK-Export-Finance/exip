import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/buyer-trading-history';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import isPopulatedArray from '../../../../helpers/is-populated-array';
import api from '../../../../api';
import { Request, ResponseInsurance, Currency } from '../../../../../types';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    OUTSTANDING_OR_OVERDUE_PAYMENTS_SAVE_AND_BACK: SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    FAILED_TO_PAY,
    FAILED_TO_PAY_CHANGE,
    FAILED_TO_PAY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, FAILED_PAYMENTS } = YOUR_BUYER_FIELD_IDS;

export const FIELD_IDS = [TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE];

export const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS;

/**
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Currencies
 * @param {string} currencyCode: Provided currency code
 * @param {boolean} changeRoute: req.originalUrl is a change route
 * @param {boolean} checkAndChangeRoute: req.originalUrl is a check-and-change route
 * @returns {object} pageVariables
 */
export const pageVariables = (referenceNumber: number, currencies: Array<Currency>, currencyCode: string) => {
  const currency = getCurrencyByCode(currencies, currencyCode);

  return {
    FIELDS: {
      TOTAL_OUTSTANDING_PAYMENTS: {
        ID: TOTAL_OUTSTANDING_PAYMENTS,
        ...FIELDS[TOTAL_OUTSTANDING_PAYMENTS],
        LABEL: `${FIELDS[TOTAL_OUTSTANDING_PAYMENTS].LABEL} ${currency.name}`,
      },
      TOTAL_AMOUNT_OVERDUE: {
        ID: TOTAL_AMOUNT_OVERDUE,
        ...FIELDS[TOTAL_AMOUNT_OVERDUE],
        LABEL: `${FIELDS[TOTAL_AMOUNT_OVERDUE].LABEL} ${currency.name}`,
      },
    },
    PAGE_CONTENT_STRINGS,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
    CURRENCY_PREFIX_SYMBOL: currency.symbol,
  };
};

/**
 * get
 * Render the outstanding or overdue payments page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Outstanding or overdue paymentspage
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const {
      referenceNumber,
      buyer: { buyerTradingHistory },
    } = application;

    const { allCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const generatedPageVariables = pageVariables(referenceNumber, allCurrencies, String(buyerTradingHistory[CURRENCY_CODE]));

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...generatedPageVariables,
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
    });
  } catch (error) {
    console.error('Error getting outstanding or overdue payments %o', error);

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

    let isChange;
    let isCheckAndChange;

    /**
     * If is a change route
     * set isChange to true
     */
    if (isChangeRoute(req.originalUrl)) {
      isChange = true;
    }

    /**
     * If is a check-and-change route
     * set isCheckAndChange to true
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      isCheckAndChange = true;
    }

    const payload = constructPayload(req.body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const generatedPageVariables = pageVariables(referenceNumber, supportedCurrencies, String(buyerTradingHistory[CURRENCY_CODE]));

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...generatedPageVariables,
        userName: getUserNameFromSession(req.session.user),
        validationErrors,
        submittedValues: payload,
      });
    }

    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const hasNoFailedPayments = buyerTradingHistory[FAILED_PAYMENTS] === null;

    /**
     * If is a change route
     * if there are no failed payments then redirect to FAILED_TO_PAY_CHANGE
     * else redirect to CHECK_YOUR_ANSWERS
     */
    if (isChange) {
      if (hasNoFailedPayments) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If is a check-and-change route
     * if there are no failed payments then redirect to FAILED_TO_PAY_CHANGE
     * redirect to CHECK_AND_CHANGE_ROUTE
     */
    if (isCheckAndChange) {
      if (hasNoFailedPayments) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY}`);
  } catch (error) {
    console.error('Error posting outstanding or overdue payments with the buyer %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

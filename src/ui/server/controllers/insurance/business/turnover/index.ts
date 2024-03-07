import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/turnover';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import isPopulatedArray from '../../../../helpers/is-populated-array';
import api from '../../../../api';
import { Request, Response, Currency } from '../../../../../types';

const { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE } = BUSINESS_FIELD_IDS.TURNOVER;

const { TURNOVER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = TURNOVER_TEMPLATE;

export const FIELD_IDS = [FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER];

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  TURNOVER_ALTERNATIVE_CURRENCY,
  TURNOVER_ALTERNATIVE_CURRENCY_CHANGE,
  TURNOVER_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE,
  TURNOVER_SAVE_AND_BACK,
  CREDIT_CONTROL,
  CHECK_YOUR_ANSWERS,
} = EXPORTER_BUSINESS_ROUTES;

const { TURNOVER: TURNOVER_FIELDS } = FIELDS;

/**
 * pageVariables for turnover page
 * When is changeRoute, then alternative currency url should be ALTERNATIVE_CURRENCY_CHANGE
 * when is checkAndChangeRoute, then alternative currency url should be ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE
 * else should be ALTERNATIVE_CURRENCY
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Array of currencies
 * @param {String} currencyCode: Provided currency code
 * @param {Boolean} changeRoute: req.originalUrl is a change route
 * @param {Boolean} checkAndChangeRoute: req.originalUrl is a check-and-change route
 * @returns {Object} pageVariables
 */
const pageVariables = (referenceNumber: number, currencies: Array<Currency>, currencyCode: string, changeRoute?: boolean, checkAndChangeRoute?: boolean) => {
  const currency = getCurrencyByCode(currencies, currencyCode);

  let alternativeCurrencyUrl = `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ALTERNATIVE_CURRENCY}`;

  // if changeRoute, then URL should be ALTERNATIVE_CURRENCY_CHANGE
  if (changeRoute) {
    alternativeCurrencyUrl = `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ALTERNATIVE_CURRENCY_CHANGE}`;
  }

  // if checkAndChangeRoute, then URL should be ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE
  if (checkAndChangeRoute) {
    alternativeCurrencyUrl = `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`;
  }

  return {
    FIELDS: {
      FINANCIAL_YEAR_END_DATE: {
        ID: FINANCIAL_YEAR_END_DATE,
        ...TURNOVER_FIELDS[FINANCIAL_YEAR_END_DATE],
      },
      ESTIMATED_ANNUAL_TURNOVER: {
        ID: ESTIMATED_ANNUAL_TURNOVER,
        ...TURNOVER_FIELDS[ESTIMATED_ANNUAL_TURNOVER],
      },
      PERCENTAGE_TURNOVER: {
        ID: PERCENTAGE_TURNOVER,
        ...TURNOVER_FIELDS[PERCENTAGE_TURNOVER],
      },
    },
    PROVIDE_ALTERNATIVE_CURRENCY_URL: alternativeCurrencyUrl,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_SAVE_AND_BACK}`,
    CURRENCY_PREFIX_SYMBOL: currency.symbol,
  };
};

/**
 * gets the template for turnover page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders turnover page with/without previously submitted details
 */
const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, business } = application;

    const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(supportedCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

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

    const generatedPageVariables = pageVariables(referenceNumber, supportedCurrencies, String(business[TURNOVER_CURRENCY_CODE]), isChange, isCheckAndChange);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: TURNOVER,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...generatedPageVariables,
    });
  } catch (err) {
    console.error('Error getting turnover %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts turnover page
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Broker page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    const { body } = req;

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

    const payload = constructPayload(body, FIELD_IDS);

    // run validation on inputs
    const validationErrors = generateValidationErrors(payload);

    // if any errors then render template with errors
    if (validationErrors) {
      const { referenceNumber: applicationReferenceNumber, business } = application;

      const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const generatedPageVariables = pageVariables(
        applicationReferenceNumber,
        supportedCurrencies,
        String(business[TURNOVER_CURRENCY_CODE]),
        isChange,
        isCheckAndChange,
      );

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: TURNOVER,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...generatedPageVariables,
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues: sanitiseData(payload),
      });
    }

    /**
     * Map and save turnover data.
     * Call the API.
     */
    const saveResponse = await mapAndSave.turnover(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChange) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    if (isChange) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CREDIT_CONTROL}`);
  } catch (err) {
    console.error('Error updating application - your business - turnover %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };

import { APPLICATION, TEMPLATES } from '../../../../constants';
import { PARTIALS as PARTIAL_TEMPLATES } from '../../../../constants/templates/partials';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import mapCountries from '../../../../helpers/mappings/map-countries';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract-agent-service-charge';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Currency, Request, ResponseInsurance } from '../../../../../types';

const {
  EXPORT_CONTRACT: { AGENT_SERVICE_CHARGE },
} = APPLICATION;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: {
    AGENT_CHARGES_SAVE_AND_BACK,
    AGENT_CHARGES_CURRENCY,
    AGENT_CHARGES_CURRENCY_CHANGE,
    AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, PERCENTAGE, PERCENTAGE_CHARGE },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES: { CONDITIONAL_PERCENTAGE_HTML },
    },
  },
} = PARTIAL_TEMPLATES;

export const FIELD_IDS = [METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Currencies
 * @param {string} currencyCode: Provided currency code
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number, currencies: Array<Currency>, currencyCode: string) => {
  const currency = getCurrencyByCode(currencies, currencyCode);

  return {
    FIELDS: {
      METHOD: {
        ID: METHOD,
        ...FIELDS.AGENT_CHARGES[METHOD],
      },
      PAYABLE_COUNTRY_CODE: {
        ID: PAYABLE_COUNTRY_CODE,
        ...FIELDS.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
      },
      FIXED_SUM: {
        ID: FIXED_SUM,
        ...FIELDS.AGENT_CHARGES[FIXED_SUM],
      },
      PERCENTAGE: {
        ID: PERCENTAGE,
        ...FIELDS.AGENT_CHARGES[PERCENTAGE],
      },
      PERCENTAGE_CHARGE: {
        ID: PERCENTAGE_CHARGE,
        ...FIELDS.AGENT_CHARGES[PERCENTAGE_CHARGE],
      },
    },
    CURRENCY_PREFIX_SYMBOL: currency.symbol,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_SAVE_AND_BACK}`,
  };
};

/**
 * get
 * Get the application and render the "Agent charges" page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} "Agent charges" page
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    referenceNumber,
    exportContract: { agent },
  } = application;

  try {
    const { allCurrencies, countries } = await api.keystone.getCountriesAndCurrencies();

    if (!isPopulatedArray(countries) || !isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber, allCurrencies, String(agent.service.charge[FIXED_SUM_CURRENCY_CODE])),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      countries: mapCountries(countries, agent.service.charge[PAYABLE_COUNTRY_CODE]),
      CONDITIONAL_PERCENTAGE_HTML,
    });
  } catch (error) {
    console.error('Error getting countries %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check for validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    referenceNumber,
    exportContract: { agent },
  } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const { allCurrencies, countries } = await api.keystone.getCountriesAndCurrencies();

      if (!isPopulatedArray(countries) || !isPopulatedArray(allCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const currencyCodeString = String(agent.service.charge[FIXED_SUM_CURRENCY_CODE]);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber, allCurrencies, currencyCodeString),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        countries: mapCountries(countries, payload[PAYABLE_COUNTRY_CODE]),
        CONDITIONAL_PERCENTAGE_HTML,
        submittedValues: sanitiseData(payload),
        validationErrors,
      });
    } catch (error) {
      console.error('Error getting countries or currencies %o', error);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgentServiceCharge(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const isFixedSumMethod = payload[METHOD] === AGENT_SERVICE_CHARGE.METHOD.FIXED_SUM;
    const hasFixedSumAmount = agent.service.charge[FIXED_SUM_AMOUNT];

    /**
     * If the route is a "change" route,
     * the agent charges are FIXED_SUM METHOD,
     * and no FIXED_SUM_AMOUNT is available,
     * redirect to AGENT_CHARGES_CURRENCY_CHANGE form.
     */
    if (isChangeRoute(req.originalUrl) && isFixedSumMethod && !hasFixedSumAmount) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY_CHANGE}`);
    }

    /**
     * If the route is a "check and change" route,
     * the agent charges are FIXED_SUM METHOD,
     * and no FIXED_SUM_AMOUNT is available,
     * redirect to AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE.
     * Otherwise, redirect to CHECK_AND_CHANGE_ROUTE.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (isFixedSumMethod && !hasFixedSumAmount) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * If the agent charges are FIXED_SUM METHOD,
     * redirect to AGENT_CHARGES_CURRENCY form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isFixedSumMethod) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (error) {
    console.error('Error updating application - export contract - agent charges %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

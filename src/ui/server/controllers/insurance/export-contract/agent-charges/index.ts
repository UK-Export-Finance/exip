import { GBP_CURRENCY_CODE, TEMPLATES } from '../../../../constants';
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
import { Currency, Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE, CHARGE_PERCENTAGE },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES: { CONDITIONAL_FIXED_SUM_HTML, CONDITIONAL_PERCENTAGE_HTML },
    },
  },
} = PARTIAL_TEMPLATES;

export const FIELD_IDS = [METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number, currencies: Array<Currency>) => {
  const currency = getCurrencyByCode(currencies, GBP_CURRENCY_CODE);

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
      // TODO: should be amount, not currency code
      FIXED_SUM_AMOUNT: {
        ID: FIXED_SUM_AMOUNT,
        ...FIELDS.AGENT_CHARGES[FIXED_SUM_AMOUNT],
      },
      PERCENTAGE: {
        ID: PERCENTAGE,
        ...FIELDS.AGENT_CHARGES[PERCENTAGE],
      },
      CHARGE_PERCENTAGE: {
        ID: CHARGE_PERCENTAGE,
        ...FIELDS.AGENT_CHARGES[CHARGE_PERCENTAGE],
      },
    },
    CURRENCY_PREFIX_SYMBOL: currency.symbol,
    PROVIDE_ALTERNATIVE_CURRENCY_URL: '#',
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
  };
};

/**
 * get
 * Get the application and render the "Agent charges" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Agent charges" page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    referenceNumber,
    exportContract: { agent },
  } = application;

  try {
    const countries = await api.keystone.countries.getAll();
    const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(countries) || !isPopulatedArray(supportedCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber, supportedCurrencies),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      countries: mapCountries(countries, agent.service.charge[PAYABLE_COUNTRY_CODE]),
      CONDITIONAL_FIXED_SUM_HTML,
      CONDITIONAL_PERCENTAGE_HTML,
    });
  } catch (err) {
    console.error('Error getting countries %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check for validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const countries = await api.keystone.countries.getAll();
      const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(countries) || !isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber, supportedCurrencies),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        countries: mapCountries(countries, payload[PAYABLE_COUNTRY_CODE]),
        CONDITIONAL_FIXED_SUM_HTML,
        CONDITIONAL_PERCENTAGE_HTML,
        submittedValues: sanitiseData(payload),
        validationErrors,
      });
    } catch (err) {
      console.error('Error getting countries or currencies %O', err);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgentServiceCharge(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - export contract - agent charges %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
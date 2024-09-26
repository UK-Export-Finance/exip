import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { isPopulatedArray } from '../../../../helpers/array';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract-agent-service-charge';
import { Currency, Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, HOW_MUCH_IS_THE_AGENT_CHARGING_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = EXPORT_CONTRACT_FIELD_IDS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_MUCH_IS_THE_AGENT_CHARGING;

export const FIELD_ID = FIXED_SUM_AMOUNT;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Currencies
 * @param {String} currencyCode: Fixed sum currency code
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number, currencies: Array<Currency>, currencyCode: string) => {
  const currency = getCurrencyByCode(currencies, currencyCode);

  return {
    FIELD: {
      ID: FIELD_ID,
      ...FIELDS.AGENT_CHARGES[FIELD_ID],
    },
    DYNAMIC_PAGE_TITLE: `${PAGE_CONTENT_STRINGS.PAGE_TITLE} ${currency.name}?`,
    CURRENCY_PREFIX_SYMBOL: currency.symbol,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_IS_THE_AGENT_CHARGING_SAVE_AND_BACK}`,
  };
};

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.HOW_MUCH_IS_THE_AGENT_CHARGING;

/**
 * get
 * Get the application and render the "Export contract - How much the agent is charging"
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Export contract - How much the agent is charging" page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    referenceNumber,
    exportContract: {
      agent: {
        service: {
          charge: { fixedSumCurrencyCode },
        },
      },
    },
  } = application;

  try {
    const { allCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const generatedPageVariables = pageVariables(referenceNumber, allCurrencies, String(fixedSumCurrencyCode));

    const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        FIELD_ID,
        PAGE_CONTENT_STRINGS: {
          ...PAGE_CONTENT_STRINGS,
          PAGE_TITLE: DYNAMIC_PAGE_TITLE,
        },
        BACK_LINK: req.headers.referer,
      }),
      ...generatedPageVariables,
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
    });
  } catch (error) {
    console.error('Error getting currencies %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check "Export contract - How much is the agent charging" validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    referenceNumber,
    exportContract: {
      agent: {
        service: {
          charge: { fixedSumCurrencyCode },
        },
      },
    },
  } = application;

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const generatedPageVariables = pageVariables(referenceNumber, supportedCurrencies, String(fixedSumCurrencyCode));

      const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

      return res.render(TEMPLATE, {
        ...singleInputPageVariables({
          FIELD_ID,
          PAGE_CONTENT_STRINGS: {
            ...PAGE_CONTENT_STRINGS,
            PAGE_TITLE: DYNAMIC_PAGE_TITLE,
          },
          BACK_LINK: req.headers.referer,
        }),
        ...generatedPageVariables,
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: sanitiseData(payload),
        validationErrors,
      });
    } catch (error) {
      console.error('Error getting currencies %O', error);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgentServiceCharge(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (error) {
    console.error('Error updating application - export contract - how much the agent is charging %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

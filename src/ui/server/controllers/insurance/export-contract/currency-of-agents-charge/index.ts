import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapRadioAndSelectOptions from '../../../../helpers/mappings/map-currencies/radio-and-select-options';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract-agent-service-charge';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: {
    HOW_MUCH_THE_AGENT_IS_CHARGING,
    HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE,
    HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE,
    AGENT_CHARGES_CURRENCY_SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_CURRENCY_CODE, FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

export const FIELD_IDS = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

export const TEMPLATE = TEMPLATES.SHARED_PAGES.CURRENCY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES_CURRENCY;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    CURRENCY_CODE: {
      ID: CURRENCY_CODE,
      ...FIELDS.AGENT_CHARGES[CURRENCY_CODE],
    },
    ALTERNATIVE_CURRENCY_CODE: {
      ID: ALTERNATIVE_CURRENCY_CODE,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY_SAVE_AND_BACK}`,
});

/**
 * Get the application and render the "Agent charges - Currency of agents charge" page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} "Agent charges - Currency of agents charge" page with/without previously submitted details
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }
    const {
      exportContract: {
        agent: {
          service: { charge },
        },
      },
      referenceNumber,
    } = application;

    const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(alternativeCurrencies) || !isPopulatedArray(supportedCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, charge[FIXED_SUM_CURRENCY_CODE]),
    });
  } catch (error) {
    console.error('Error getting Export contract - Agent charges - currency of agents charge %o', error);

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
    exportContract: { agent },
    referenceNumber,
  } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(alternativeCurrencies) || !isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[CURRENCY_CODE]),
        validationErrors,
      });
    } catch (error) {
      console.error('Error getting currencies %o', error);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    const saveResponse = await mapAndSave.exportContractAgentServiceCharge(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const hasFixedSumAmount = agent.service.charge[FIXED_SUM_AMOUNT];

    if (isChangeRoute(req.originalUrl)) {
      /**
       * If the URL is a "change" route,
       * and there is no FIXED_SUM_AMOUNT,
       * redirect to HOW_MUCH_THE_AGENT_IS_CHARGING with /change in URL.
       * This ensures that the next page can consume /change in the URL
       * and therefore correctly redirect on submission.
       */

      if (!hasFixedSumAmount) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      /**
       * If the URL is a "check and change" route,
       * and there is no FIXED_SUM_AMOUNT,
       * redirect to HOW_MUCH_THE_AGENT_IS_CHARGING with /check-and-change in URL.
       * This ensures that the next page can consume /change in the URL
       * and therefore correctly redirect on submission.
       */
      if (!hasFixedSumAmount) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`);
  } catch (error) {
    console.error('Error updating application - export contract - currency of agents charge %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

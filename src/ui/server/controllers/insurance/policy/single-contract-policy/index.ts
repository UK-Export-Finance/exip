import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import mapRadioAndSelectOptions from '../../../../helpers/mappings/map-currencies/radio-and-select-options';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: {
    SINGLE_CONTRACT_POLICY_SAVE_AND_BACK,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      REQUESTED_START_DATE_DAY,
      REQUESTED_START_DATE_MONTH,
      REQUESTED_START_DATE_YEAR,
      SINGLE: { CONTRACT_COMPLETION_DATE, CONTRACT_COMPLETION_DATE_DAY, CONTRACT_COMPLETION_DATE_MONTH, CONTRACT_COMPLETION_DATE_YEAR, TOTAL_CONTRACT_VALUE },
      POLICY_CURRENCY_CODE,
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    REQUESTED_START_DATE: {
      ID: REQUESTED_START_DATE,
      ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
    },
    CONTRACT_COMPLETION_DATE: {
      ID: CONTRACT_COMPLETION_DATE,
      ...FIELDS.CONTRACT_POLICY.SINGLE[CONTRACT_COMPLETION_DATE],
    },
    CURRENCY_CODE: {
      ID: CURRENCY_CODE,
      ...FIELDS.CONTRACT_POLICY[CURRENCY_CODE],
    },
    ALTERNATIVE_CURRENCY_CODE: {
      ID: ALTERNATIVE_CURRENCY_CODE,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY;

export const FIELD_IDS = [
  REQUESTED_START_DATE_DAY,
  REQUESTED_START_DATE_MONTH,
  REQUESTED_START_DATE_YEAR,
  CONTRACT_COMPLETION_DATE_DAY,
  CONTRACT_COMPLETION_DATE_MONTH,
  CONTRACT_COMPLETION_DATE_YEAR,
  POLICY_CURRENCY_CODE,
  CURRENCY_CODE,
  ALTERNATIVE_CURRENCY_CODE,
];

/**
 * get
 * Render the Single contract policy page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Single contract policy page
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  try {
    const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(supportedCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const currencyAnswer = application.policy[POLICY_CURRENCY_CODE];

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, currencyAnswer),
    });
  } catch (error) {
    console.error('Error getting currencies %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Single contract policy validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { policy } = application;

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const currencyAnswer = application.policy[POLICY_CURRENCY_CODE] || payload[CURRENCY_CODE];

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, currencyAnswer),
        validationErrors,
      });
    } catch (error) {
      console.error('Error getting currencies %o', error);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policy(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const hasTotalContractValue = policy[TOTAL_CONTRACT_VALUE];

    /**
     * If the route is a "change" route,
     * and the application has no TOTAL_CONTRACT_VALUE saved (specifically required for a "single" policy type),
     * redirect to the TOTAL_CONTRACT_VALUE form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isChangeRoute(req.originalUrl)) {
      if (!hasTotalContractValue) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If the route is a "check and change" route,
     * and there is no TOTAL_CONTRACT_VALUE saved (specifically required for a "single" policy type),
     * redirect to the TOTAL_CONTRACT_VALUE form.
     * Otherwise, redirect to "check and change" route.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (!hasTotalContractValue) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`);
  } catch (error) {
    console.error('Error updating application - policy - single contract policy %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

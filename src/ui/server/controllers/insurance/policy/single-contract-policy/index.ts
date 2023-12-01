import { ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import mapCurrenciesAsRadioOptions from '../../../../helpers/mappings/map-currencies/as-radio-options';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { SINGLE_CONTRACT_POLICY_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    REQUESTED_START_DATE_DAY,
    REQUESTED_START_DATE_MONTH,
    REQUESTED_START_DATE_YEAR,
    SINGLE: { CONTRACT_COMPLETION_DATE, CONTRACT_COMPLETION_DATE_DAY, CONTRACT_COMPLETION_DATE_MONTH, CONTRACT_COMPLETION_DATE_YEAR, TOTAL_CONTRACT_VALUE },
    POLICY_CURRENCY_CODE,
  },
} = POLICY_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
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
    TOTAL_CONTRACT_VALUE: {
      ID: TOTAL_CONTRACT_VALUE,
      ...FIELDS.CONTRACT_POLICY.SINGLE[TOTAL_CONTRACT_VALUE],
    },
    POLICY_CURRENCY_CODE: {
      ID: POLICY_CURRENCY_CODE,
      ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
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
  TOTAL_CONTRACT_VALUE,
  POLICY_CURRENCY_CODE,
];

/**
 * get
 * Get the application and render the Single contract policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Single contract policy page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    const currencies = await api.external.getCurrencies();

    if (!isPopulatedArray(currencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      currencies: mapCurrenciesAsRadioOptions(currencies),
    });
  } catch (err) {
    console.error('Error getting currencies %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Single contract policy validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const currencies = await api.external.getCurrencies();

      if (!isPopulatedArray(currencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
        currencies: mapCurrenciesAsRadioOptions(currencies),
        validationErrors,
      });
    } catch (err) {
      console.error('Error getting currencies %O', err);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const saveResponse = await mapAndSave.policy(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`);
  } catch (err) {
    console.error('Error updating application - policy - single contract policy %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

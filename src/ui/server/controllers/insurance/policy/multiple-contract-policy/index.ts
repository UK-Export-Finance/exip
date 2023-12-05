import { ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import { objectHasProperty } from '../../../../helpers/object';
import mapCurrenciesAsRadioOptions from '../../../../helpers/mappings/map-currencies/as-radio-options';
import mapTotalMonthsOfCover from '../../../../helpers/mappings/map-total-months-of-insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS },
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
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
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
    TOTAL_MONTHS_OF_COVER: {
      ID: TOTAL_MONTHS_OF_COVER,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER],
    },
    TOTAL_SALES_TO_BUYER: {
      ID: TOTAL_SALES_TO_BUYER,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_SALES_TO_BUYER],
    },
    MAXIMUM_BUYER_WILL_OWE: {
      ID: MAXIMUM_BUYER_WILL_OWE,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[MAXIMUM_BUYER_WILL_OWE],
    },
    POLICY_CURRENCY_CODE: {
      ID: POLICY_CURRENCY_CODE,
      ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY;

export const FIELD_IDS = [
  REQUESTED_START_DATE_DAY,
  REQUESTED_START_DATE_MONTH,
  REQUESTED_START_DATE_YEAR,
  TOTAL_MONTHS_OF_COVER,
  TOTAL_SALES_TO_BUYER,
  MAXIMUM_BUYER_WILL_OWE,
  POLICY_CURRENCY_CODE,
];

export const totalMonthsOfCoverOptions = FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER].OPTIONS as Array<number>;

/**
 * get
 * Get the application and render the Multiple contract policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Multiple contract policy page
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

    let mappedTotalMonthsOfCover;

    if (objectHasProperty(application.policy, TOTAL_MONTHS_OF_COVER)) {
      mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions, application.policy[TOTAL_MONTHS_OF_COVER]);
    } else {
      mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      currencies: mapCurrenciesAsRadioOptions(currencies),
      monthOptions: mappedTotalMonthsOfCover,
    });
  } catch (err) {
    console.error('Error getting currencies %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Multiple contract policy validation errors and if successful, redirect to the next part of the flow.
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

      let mappedTotalMonthsOfCover;

      if (objectHasProperty(payload, TOTAL_MONTHS_OF_COVER)) {
        mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions, payload[TOTAL_MONTHS_OF_COVER]);
      } else {
        mappedTotalMonthsOfCover = mapTotalMonthsOfCover(totalMonthsOfCoverOptions);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
        currencies: mapCurrenciesAsRadioOptions(currencies),
        monthOptions: mappedTotalMonthsOfCover,
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
    console.error('Error updating application - policy - multiple contract policy %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapSubmittedData from './map-submitted-data';
import save from '../save-data';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT } = INSURANCE;

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  SINGLE: { COMPLETION_OF_CONTRACT_DATE, TOTAL_CONTRACT_VALUE },
  CREDIT_PERIOD_WITH_BUYER,
  POLICY_CURRENCY_CODE,
} = CONTRACT_POLICY;

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
    COMPLETION_OF_CONTRACT_DATE: {
      ID: COMPLETION_OF_CONTRACT_DATE,
      ...FIELDS.CONTRACT_POLICY.SINGLE[COMPLETION_OF_CONTRACT_DATE],
    },
    TOTAL_CONTRACT_VALUE: {
      ID: TOTAL_CONTRACT_VALUE,
      ...FIELDS.CONTRACT_POLICY.SINGLE[TOTAL_CONTRACT_VALUE],
    },
    CREDIT_PERIOD_WITH_BUYER: {
      ID: CREDIT_PERIOD_WITH_BUYER,
      ...FIELDS.CONTRACT_POLICY[CREDIT_PERIOD_WITH_BUYER],
    },
    POLICY_CURRENCY_CODE: {
      ID: POLICY_CURRENCY_CODE,
      ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY;

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
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    const currencies = await api.external.getCurrencies();

    if (!currencies || !currencies.length) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const mappedCurrencies = mapCurrencies(currencies);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      application: mapApplicationToFormFields(application),
      currencies: mappedCurrencies,
    });
  } catch (err) {
    console.error('Error getting currencies ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
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
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    try {
      const currencies = await api.external.getCurrencies();

      if (!currencies || !currencies.length) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      const mappedCurrencies = mapCurrencies(currencies);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        application,
        currencies: mappedCurrencies,
        validationErrors,
        submittedValues: req.body,
      });
    } catch (err) {
      console.error('Error getting currencies ', { err });

      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // save the application
    const populatedData = mapSubmittedData(req.body);

    const saveResponse = await save.policyAndExport(application, populatedData);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`);
  } catch (err) {
    console.error('Error updating application', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

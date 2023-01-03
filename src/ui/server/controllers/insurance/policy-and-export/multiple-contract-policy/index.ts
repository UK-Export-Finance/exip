import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  MULTIPLE: { TOTAL_MONTHS_OF_INSURANCE, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
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
    TOTAL_MONTHS_OF_INSURANCE: {
      ID: TOTAL_MONTHS_OF_INSURANCE,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_INSURANCE],
    },
    TOTAL_SALES_TO_BUYER: {
      ID: TOTAL_SALES_TO_BUYER,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_SALES_TO_BUYER],
    },
    MAXIMUM_BUYER_WILL_OWE: {
      ID: MAXIMUM_BUYER_WILL_OWE,
      ...FIELDS.CONTRACT_POLICY.MULTIPLE[MAXIMUM_BUYER_WILL_OWE],
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
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY;

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
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY,
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

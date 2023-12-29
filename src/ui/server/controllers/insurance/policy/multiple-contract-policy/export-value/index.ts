import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import getCurrencyByCode from '../../../../../helpers/get-currency-by-code';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { isPopulatedArray } from '../../../../../helpers/array';
import mapApplicationToFormFields from '../../../../../helpers/mappings/map-application-to-form-fields';
import { Currency, Request, Response } from '../../../../../../types';

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (currencies: Array<Currency>, policyCurrencyCode: string) => ({
  FIELDS: {
    TOTAL_SALES_TO_BUYER: {
      ID: TOTAL_SALES_TO_BUYER,
      ...FIELDS.EXPORT_VALUE.MULTIPLE[TOTAL_SALES_TO_BUYER],
    },
    MAXIMUM_BUYER_WILL_OWE: {
      ID: MAXIMUM_BUYER_WILL_OWE,
      ...FIELDS.EXPORT_VALUE.MULTIPLE[MAXIMUM_BUYER_WILL_OWE],
    },
  },
  CURRENCY_NAME: getCurrencyByCode(currencies, policyCurrencyCode),
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.EXPORT_VALUE.MULTIPLE;

export const FIELD_IDS = [TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE];

/**
 * get
 * Get the application and render the Multiple contract policy - Export value page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Multiple contract policy - Export value page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    policy: { policyCurrencyCode },
  } = application;

  try {
    const currencies = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(currencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(currencies, String(policyCurrencyCode)),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
    });
  } catch (err) {
    console.error('Error getting currencies %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

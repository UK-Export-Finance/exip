import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import getCurrencyByCode from '../../../../../helpers/get-currency-by-code';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import api from '../../../../../api';
import { isPopulatedArray } from '../../../../../helpers/array';
import mapApplicationToFormFields from '../../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../../map-and-save/policy';
import isChangeRoute from '../../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../../helpers/is-check-and-change-route';
import { Currency, Request, Response } from '../../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { NAME_ON_POLICY, CHECK_YOUR_ANSWERS, SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE },
  },
} = POLICY_FIELD_IDS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE;

export const FIELD_ID = TOTAL_CONTRACT_VALUE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @param {Array} currencies: Currencies
 * @param {String} policyCurrencyCode: Policy currency code
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number, currencies: Array<Currency>, policyCurrencyCode: string) => {
  const currency = getCurrencyByCode(currencies, policyCurrencyCode);

  return {
    FIELD: {
      ID: FIELD_ID,
      ...FIELDS.CONTRACT_POLICY.SINGLE[FIELD_ID],
    },
    DYNAMIC_PAGE_TITLE: `${PAGE_CONTENT_STRINGS.PAGE_TITLE} ${currency.name}?`,
    CURRENCY_PREFIX_SYMBOL: currency.symbol,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK}`,
  };
};

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE;

/**
 * get
 * Get the application and render the Single contract policy - Total contract value page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Single contract policy - Total contract value page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const {
    referenceNumber,
    policy: { policyCurrencyCode },
  } = application;

  try {
    const { allCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const generatedPageVariables = pageVariables(referenceNumber, allCurrencies, String(policyCurrencyCode));

    const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
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
  } catch (err) {
    console.error('Error getting currencies %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Single contract policy - Total contract value validation errors and if successful, redirect to the next part of the flow.
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
    policy: { policyCurrencyCode },
  } = application;

  const payload = constructPayload(req.body, [TOTAL_CONTRACT_VALUE]);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      const { supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(supportedCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      const generatedPageVariables = pageVariables(referenceNumber, supportedCurrencies, String(policyCurrencyCode));

      const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: {
            ...PAGE_CONTENT_STRINGS,
            PAGE_TITLE: DYNAMIC_PAGE_TITLE,
          },
          BACK_LINK: req.headers.referer,
        }),
        ...generatedPageVariables,
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
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

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`);
  } catch (err) {
    console.error('Error updating application - policy - single contract policy - total contract value %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

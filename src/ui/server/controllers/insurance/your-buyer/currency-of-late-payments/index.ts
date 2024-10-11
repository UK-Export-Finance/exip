import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import mapRadioAndSelectOptions from '../../../../helpers/mappings/map-currencies/radio-and-select-options';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/buyer-trading-history';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    OUTSTANDING_OR_OVERDUE_PAYMENTS,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_SAVE_AND_BACK: SAVE_AND_BACK,
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

export const FIELD_IDS = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

export const TEMPLATE = TEMPLATES.SHARED_PAGES.CURRENCY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    CURRENCY_CODE: {
      ID: CURRENCY_CODE,
      ...FIELDS[CURRENCY_CODE],
    },
    ALTERNATIVE_CURRENCY_CODE: {
      ID: ALTERNATIVE_CURRENCY_CODE,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
});

/**
 * get
 * Render the currency of late payments page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Currency of late payments page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(supportedCurrencies) || !isPopulatedArray(alternativeCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, application.buyer.buyerTradingHistory?.currencyCode),
    });
  } catch (error) {
    console.error('Error getting currency of late payments %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check currency of late payments validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

      if (!isPopulatedArray(supportedCurrencies) || !isPopulatedArray(alternativeCurrencies)) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        validationErrors,
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[CURRENCY_CODE]),
      });
    }

    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If is a change route
     * redirect to CHECK_YOUR_ANSWERS
     */
    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`);
    }

    /**
     * If is a check-and-change route
     * redirect to CHECK_AND_CHANGE_ROUTE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`);
  } catch (error) {
    console.error('Error posting currency of late payments %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

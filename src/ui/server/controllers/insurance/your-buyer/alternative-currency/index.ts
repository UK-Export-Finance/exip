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
import { sanitiseData } from '../../../../helpers/sanitise-data';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';
import mapAndSave from '../map-and-save/buyer-trading-history';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { TRADING_HISTORY, TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

export const FIELD_IDS = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

export const TEMPLATE = TEMPLATES.SHARED_PAGES.ALTERNATIVE_CURRENCY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.ALTERNATIVE_CURRENCY;

export const PAGE_VARIABLES = {
  FIELDS: {
    CURRENCY_CODE: {
      ID: CURRENCY_CODE,
      ...FIELDS[CURRENCY_CODE],
    },
    ALTERNATIVE_CURRENCY_CODE: {
      ID: ALTERNATIVE_CURRENCY_CODE,
    },
  },
};

/**
 * get
 * Render the alternative currency page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Alternative currency page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { alternativeCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(supportedCurrencies) || !isPopulatedArray(alternativeCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, application.buyer.buyerTradingHistory?.currencyCode),
    });
  } catch (err) {
    console.error('Error getting alternative currency %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check alternative currency validation errors and if successful, redirect to the next part of the flow.
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
        ...PAGE_VARIABLES,
        userName: getUserNameFromSession(req.session.user),
        validationErrors,
        submittedValues: sanitiseData(payload),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[ALTERNATIVE_CURRENCY_CODE]),
      });
    }

    // if no errors, then runs save api call
    const saveResponse = await mapAndSave.buyerTradingHistory(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If is a change route
     * redirect to TRADING_HISTORY_CHANGE
     */
    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY_CHANGE}`);
    }

    /**
     * If is a check-and-change route
     * redirect to TRADING_HISTORY_CHECK_AND_CHANGE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY_CHECK_AND_CHANGE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`);
  } catch (err) {
    console.error('Error posting alternative currency %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELDS } from '../../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import api from '../../../../../api';
import { isPopulatedArray } from '../../../../../helpers/array';
import mapRadioAndSelectOptions from '../../../../../helpers/mappings/map-currencies/radio-and-select-options';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

export const FIELD_IDS = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

export const TEMPLATE = TEMPLATES.SHARED_PAGES.ALTERNATIVE_CURRENCY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY;

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
 * gets the template for turnover currency page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders turnover currency page with/without previously submitted details
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { allCurrencies, supportedCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(supportedCurrencies) || !isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      userName: getUserNameFromSession(req.session.user),
      ...mapRadioAndSelectOptions(allCurrencies, supportedCurrencies, ''),
    });
  } catch (err) {
    console.error('Error getting turnover currency %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

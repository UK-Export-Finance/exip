import { FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS as ALL_FIELD_IDS, PERCENTAGES_OF_COVER, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import { objectHasProperty } from '../../../helpers/object';
import { isPopulatedArray } from '../../../helpers/array';
import mapCurrenciesAsSelectOptions from '../../../helpers/mappings/map-currencies/as-select-options';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import corePageVariables from '../../../helpers/page-variables/core';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import getCurrencyByCode from '../../../helpers/get-currency-by-code';
import mapPercentageOfCover from '../../../helpers/mappings/map-percentage-of-cover';
import mapCreditPeriod from '../../../helpers/mappings/map-credit-period';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import isChangeRoute from '../../../helpers/is-change-route';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import { Request, Response, SelectOption } from '../../../../types';

const {
  ELIGIBILITY: { AMOUNT_CURRENCY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER },
  POLICY_TYPE,
  POLICY_LENGTH,
} = ALL_FIELD_IDS;

const { TELL_US_ABOUT_YOUR_POLICY } = PAGES.QUOTE;

export const FIELD_IDS = [AMOUNT_CURRENCY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, POLICY_LENGTH];

/**
 * generatePageVariables
 * Page title and fields
 * @param {String} Policy type
 * @returns {Object} Page variables
 */
const generatePageVariables = (policyType: string) => {
  const pageVariables = {
    PAGE_TITLE: '',
    FIELDS: {
      AMOUNT_CURRENCY: {},
      CURRENCY: {
        ID: CURRENCY,
        ...FIELDS[CURRENCY],
      },
      PERCENTAGE_OF_COVER: {},
      POLICY_LENGTH: {},
      CONTRACT_VALUE: {},
      MAX_AMOUNT_OWED: {},
      CREDIT_PERIOD: {},
    },
  };

  if (isSinglePolicyType(policyType)) {
    pageVariables.PAGE_TITLE = TELL_US_ABOUT_YOUR_POLICY.SINGLE_POLICY_PAGE_TITLE;

    pageVariables.FIELDS.AMOUNT_CURRENCY = {
      ID: AMOUNT_CURRENCY,
      ...FIELDS[AMOUNT_CURRENCY].SINGLE_POLICY,
    };

    pageVariables.FIELDS.PERCENTAGE_OF_COVER = {
      ID: PERCENTAGE_OF_COVER,
      ...FIELDS[PERCENTAGE_OF_COVER].SINGLE_POLICY,
    };

    pageVariables.FIELDS.POLICY_LENGTH = {
      ID: POLICY_LENGTH,
      ...FIELDS[POLICY_LENGTH],
    };

    pageVariables.FIELDS.CONTRACT_VALUE = {
      ID: CONTRACT_VALUE,
      ...FIELDS[CONTRACT_VALUE],
    };
  }

  if (isMultiplePolicyType(policyType)) {
    pageVariables.PAGE_TITLE = TELL_US_ABOUT_YOUR_POLICY.MULTIPLE_POLICY_PAGE_TITLE;

    pageVariables.FIELDS.AMOUNT_CURRENCY = {
      ID: AMOUNT_CURRENCY,
      ...FIELDS[AMOUNT_CURRENCY].MULTIPLE_POLICY,
    };

    pageVariables.FIELDS.PERCENTAGE_OF_COVER = {
      ID: PERCENTAGE_OF_COVER,
      ...FIELDS[PERCENTAGE_OF_COVER].MULTIPLE_POLICY,
    };

    pageVariables.FIELDS.MAX_AMOUNT_OWED = {
      ID: MAX_AMOUNT_OWED,
      ...FIELDS[MAX_AMOUNT_OWED],
    };

    pageVariables.FIELDS.CREDIT_PERIOD = {
      ID: CREDIT_PERIOD,
      ...FIELDS[CREDIT_PERIOD],
    };
  }

  return pageVariables;
};

export const TEMPLATE = TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

const get = async (req: Request, res: Response) => {
  try {
    const { submittedData } = req.session;
    const currencies = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(currencies)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    let mappedCurrencies;

    if (objectHasProperty(submittedData.quoteEligibility, CURRENCY)) {
      mappedCurrencies = mapCurrenciesAsSelectOptions(currencies, submittedData.quoteEligibility[CURRENCY].isoCode);
    } else {
      mappedCurrencies = mapCurrenciesAsSelectOptions(currencies);
    }

    let mappedPercentageOfCover;

    if (objectHasProperty(submittedData.quoteEligibility, PERCENTAGE_OF_COVER)) {
      mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER, Number(submittedData.quoteEligibility[PERCENTAGE_OF_COVER]));
    } else {
      mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
    }

    const creditPeriodOptions = FIELDS[CREDIT_PERIOD].OPTIONS as Array<SelectOption>;
    let mappedCreditPeriod;

    if (objectHasProperty(submittedData.quoteEligibility, CREDIT_PERIOD)) {
      mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions, String(submittedData.quoteEligibility[CREDIT_PERIOD]));
    } else {
      mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions);
    }

    const policyType = submittedData.quoteEligibility[POLICY_TYPE];

    const PAGE_VARIABLES = generatePageVariables(policyType);

    return res.render(TEMPLATE, {
      userName: getUserNameFromSession(req.session.user),
      ...corePageVariables({
        PAGE_CONTENT_STRINGS: {
          ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
          PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
        },
        BACK_LINK: req.headers.referer,
        ORIGINAL_URL: req.originalUrl,
      }),
      ...generatePageVariables(policyType),
      isSinglePolicyType: isSinglePolicyType(policyType),
      isMultiplePolicyType: isMultiplePolicyType(policyType),
      currencies: mappedCurrencies,
      percentageOfCover: mappedPercentageOfCover,
      creditPeriod: mappedCreditPeriod,
      submittedValues: submittedData.quoteEligibility,
    });
  } catch (err) {
    console.error('Error getting quote - tell us about your policy %O', err);

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

const post = async (req: Request, res: Response) => {
  try {
    const { submittedData } = req.session;

    const payload = constructPayload(req.body, FIELD_IDS);

    const validationErrors = generateValidationErrors({
      ...submittedData.quoteEligibility,
      ...payload,
    });

    const currencies = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(currencies)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const submittedCurrencyCode = payload[CURRENCY];

    if (validationErrors) {
      // map currencies drop down options
      let mappedCurrencies = [];

      if (submittedCurrencyCode) {
        mappedCurrencies = mapCurrenciesAsSelectOptions(currencies, submittedCurrencyCode);
      } else {
        mappedCurrencies = mapCurrenciesAsSelectOptions(currencies);
      }

      // map percentage of cover drop down options
      let mappedPercentageOfCover = [];
      const submittedPercentageOfCover = Number(req.body[PERCENTAGE_OF_COVER]);

      if (submittedPercentageOfCover) {
        mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER, submittedPercentageOfCover);
      } else {
        mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
      }

      // map credit period drop down options
      let mappedCreditPeriod = [];
      const submittedCreditPeriod = payload[CREDIT_PERIOD];

      const creditPeriodOptions = FIELDS[CREDIT_PERIOD].OPTIONS as Array<SelectOption>;

      if (submittedCreditPeriod) {
        mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions, submittedCreditPeriod);
      } else {
        mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions);
      }

      const policyType = submittedData.quoteEligibility[POLICY_TYPE];

      const PAGE_VARIABLES = generatePageVariables(policyType);

      return res.render(TEMPLATE, {
        userName: getUserNameFromSession(req.session.user),
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: {
            ...PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
            PAGE_TITLE: PAGE_VARIABLES.PAGE_TITLE,
          },
          BACK_LINK: req.headers.referer,
          ORIGINAL_URL: req.originalUrl,
        }),
        ...generatePageVariables(policyType),
        isSinglePolicyType: isSinglePolicyType(policyType),
        isMultiplePolicyType: isMultiplePolicyType(policyType),
        currencies: mappedCurrencies,
        validationErrors,
        percentageOfCover: mappedPercentageOfCover,
        creditPeriod: mappedCreditPeriod,
        submittedValues: payload,
      });
    }

    const populatedData = {
      ...payload,
      [CURRENCY]: getCurrencyByCode(currencies, submittedCurrencyCode),
    };

    req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    }

    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  } catch (err) {
    console.error('Error posting quote - tell us about your policy %O', err);

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { generatePageVariables, get, post };

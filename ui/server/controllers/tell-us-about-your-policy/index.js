const CONTENT_STRINGS = require('../../content-strings');
const {
  FIELD_IDS,
  PERCENTAGES_OF_COVER,
  ROUTES,
  TEMPLATES,
} = require('../../constants');
const api = require('../../api');
const { mapCurrencies } = require('../../helpers/mappings/map-currencies');
const generateValidationErrors = require('./validation');
const getCurrencyByCode = require('../../helpers/get-currency-by-code');
const mapPercentageOfCover = require('../../helpers/mappings/map-percentage-of-cover');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');
const { isSinglePolicyType, isMultiPolicyType } = require('../../helpers/policy-type');

const {
  AMOUNT_CURRENCY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  CURRENCY,
  MAX_AMOUNT_OWED,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
} = FIELD_IDS;

const generatePageVariables = (policyType) => {
  const pageVariables = {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      ...CONTENT_STRINGS.PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
    },
    FIELDS: {
      AMOUNT_CURRENCY: {
        ID: AMOUNT_CURRENCY,
      },
      CURRENCY: {
        ID: CURRENCY,
        ...CONTENT_STRINGS.FIELDS[CURRENCY],
      },
      PERCENTAGE_OF_COVER: {
        ID: PERCENTAGE_OF_COVER,
      },
    },
  };

  const { TELL_US_ABOUT_YOUR_POLICY_PAGE } = CONTENT_STRINGS.PAGES;

  if (isSinglePolicyType(policyType)) {
    pageVariables.CONTENT_STRINGS.PAGE_TITLE = TELL_US_ABOUT_YOUR_POLICY_PAGE.SINGLE_POLICY_PAGE_TITLE;
    pageVariables.CONTENT_STRINGS.HEADING = TELL_US_ABOUT_YOUR_POLICY_PAGE.SINGLE_POLICY_HEADING;

    pageVariables.FIELDS.AMOUNT_CURRENCY = {
      ID: AMOUNT_CURRENCY,
      ...CONTENT_STRINGS.FIELDS[AMOUNT_CURRENCY].SINGLE_POLICY,
    };

    pageVariables.FIELDS.CONTRACT_VALUE = {
      ID: CONTRACT_VALUE,
      ...CONTENT_STRINGS.FIELDS[CONTRACT_VALUE],
    };

    pageVariables.FIELDS.PERCENTAGE_OF_COVER = {
      ID: PERCENTAGE_OF_COVER,
      ...CONTENT_STRINGS.FIELDS[PERCENTAGE_OF_COVER].SINGLE_POLICY,
    };
  }

  if (isMultiPolicyType(policyType)) {
    pageVariables.CONTENT_STRINGS.PAGE_TITLE = TELL_US_ABOUT_YOUR_POLICY_PAGE.MULTI_POLICY_PAGE_TITLE;
    pageVariables.CONTENT_STRINGS.HEADING = TELL_US_ABOUT_YOUR_POLICY_PAGE.MULTI_POLICY_HEADING;

    pageVariables.FIELDS.AMOUNT_CURRENCY = {
      ID: AMOUNT_CURRENCY,
      ...CONTENT_STRINGS.FIELDS[AMOUNT_CURRENCY].MULTI_POLICY,
    };

    pageVariables.FIELDS.MAX_AMOUNT_OWED = {
      ID: MAX_AMOUNT_OWED,
      ...CONTENT_STRINGS.FIELDS[MAX_AMOUNT_OWED],
    };

    pageVariables.FIELDS.PERCENTAGE_OF_COVER = {
      ID: PERCENTAGE_OF_COVER,
      ...CONTENT_STRINGS.FIELDS[PERCENTAGE_OF_COVER].MULTI_POLICY,
    };

    pageVariables.FIELDS.CREDIT_PERIOD = {
      ID: CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[CREDIT_PERIOD],
    };
  }

  return pageVariables;
};

const get = async (req, res) => {
  const { submittedData } = req.session;
  const currencies = await api.getCurrencies();

  let mappedCurrencies;
  if (submittedData && submittedData[FIELD_IDS.CURRENCY]) {
    mappedCurrencies = mapCurrencies(currencies, submittedData[FIELD_IDS.CURRENCY].isoCode);
  } else {
    mappedCurrencies = mapCurrencies(currencies);
  }

  let mappedPercentageOfCover;

  if (submittedData && submittedData[PERCENTAGE_OF_COVER]) {
    mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER, Number(submittedData[PERCENTAGE_OF_COVER]));
  } else {
    mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
  }

  const PAGE_VARIABLES = generatePageVariables(submittedData[POLICY_TYPE]);

  return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    isSinglePolicyType: isSinglePolicyType(submittedData[POLICY_TYPE]),
    isMultiPolicyType: isMultiPolicyType(submittedData[POLICY_TYPE]),
    currencies: mappedCurrencies,
    percentageOfCover: mappedPercentageOfCover,
    submittedValues: submittedData,
  });
};

const post = async (req, res) => {
  const { submittedData } = req.session;

  const validationErrors = generateValidationErrors({
    ...submittedData,
    ...req.body,
  });

  const submittedCurrencyCode = req.body[FIELD_IDS.CURRENCY];

  const currencies = await api.getCurrencies();

  if (validationErrors) {
    let mappedCurrencies = [];

    if (submittedCurrencyCode) {
      mappedCurrencies = mapCurrencies(currencies, submittedCurrencyCode);
    } else {
      mappedCurrencies = mapCurrencies(currencies);
    }

    const submittedPercentageOfCover = req.body[PERCENTAGE_OF_COVER];

    let mappedPercentageOfCover;

    if (submittedPercentageOfCover) {
      mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER, submittedPercentageOfCover);
    } else {
      mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
    }

    const PAGE_VARIABLES = generatePageVariables(submittedData[POLICY_TYPE]);

    return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      isSinglePolicyType: isSinglePolicyType(submittedData[POLICY_TYPE]),
      isMultiPolicyType: isMultiPolicyType(submittedData[POLICY_TYPE]),
      currencies: mappedCurrencies,
      validationErrors,
      percentageOfCover: mappedPercentageOfCover,
      submittedValues: req.body,
    });
  }

  const populatedData = {
    ...req.body,
    [FIELD_IDS.CURRENCY]: getCurrencyByCode(currencies, submittedCurrencyCode),
  };

  req.session.submittedData = updateSubmittedData(
    populatedData,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
};

module.exports = {
  // BASE_PAGE_VARIABLES,
  generatePageVariables,
  get,
  post,
};

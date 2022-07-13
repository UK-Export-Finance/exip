const CONTENT_STRINGS = require('../../content-strings');
const {
  TEMPLATES,
  ROUTES,
  FIELD_IDS,
} = require('../../constants');
const api = require('../../api');
const { mapCurrencies } = require('../../helpers/map-currencies');
const generateValidationErrors = require('./validation');
const getCurrencyByCode = require('../../helpers/get-currency-by-code');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const {
  AMOUNT_CURRENCY,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    BUTTONS: CONTENT_STRINGS.BUTTONS,
    ...CONTENT_STRINGS.PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
  },
  FIELDS: {
    AMOUNT_CURRENCY: {
      ID: AMOUNT_CURRENCY,
      ...CONTENT_STRINGS.FIELDS[AMOUNT_CURRENCY],
    },
    CURRENCY: {
      ID: CURRENCY,
      ...CONTENT_STRINGS.FIELDS[CURRENCY],
    },
    AMOUNT: {
      ID: AMOUNT,
      ...CONTENT_STRINGS.FIELDS[AMOUNT],
    },
    CREDIT_PERIOD: {
      ID: CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[CREDIT_PERIOD],
    },
    POLICY_TYPE: {
      ID: POLICY_TYPE,
      ...CONTENT_STRINGS.FIELDS[POLICY_TYPE],
    },
    // note: "single policy type" is only required for scenario where
    // empty form is submitted. Then, error message link can link to
    // the first policy type radio button (single).
    SINGLE_POLICY_TYPE: {
      ID: SINGLE_POLICY_TYPE,
      ...CONTENT_STRINGS.FIELDS[POLICY_TYPE],
    },
    SINGLE_POLICY_LENGTH: {
      ID: SINGLE_POLICY_LENGTH,
      ...CONTENT_STRINGS.FIELDS[SINGLE_POLICY_LENGTH],
    },
    MULTI_POLICY_LENGTH: {
      ID: MULTI_POLICY_LENGTH,
      ...CONTENT_STRINGS.FIELDS[MULTI_POLICY_LENGTH],
    },
  },
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

  return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    currencies: mappedCurrencies,
    submittedValues: submittedData,
  });
};

const post = async (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  const submittedCurrencyCode = req.body[FIELD_IDS.CURRENCY];

  const currencies = await api.getCurrencies();

  if (validationErrors) {
    let mappedCurrencies = [];

    if (submittedCurrencyCode) {
      mappedCurrencies = mapCurrencies(currencies, submittedCurrencyCode);
    } else {
      mappedCurrencies = mapCurrencies(currencies);
    }

    return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      currencies: mappedCurrencies,
      validationErrors,
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
  PAGE_VARIABLES,
  get,
  post,
};

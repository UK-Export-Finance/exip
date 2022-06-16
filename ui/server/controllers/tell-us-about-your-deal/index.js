const CONTENT_STRINGS = require('../../content-strings');
const {
  TEMPLATES,
  ROUTES,
  FIELD_IDS,
} = require('../../constants');
const api = require('../../api');
const mapCurrencies = require('../../helpers/map-currencies');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');
const mapSubmittedValues = require('../../helpers/map-submitted-values');

const {
  AMOUNT_CURRENCY,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    BUTTONS: CONTENT_STRINGS.BUTTONS,
    ...CONTENT_STRINGS.PAGES.TELL_US_ABOUT_YOUR_DEAL_PAGE,
  },
  BACK_LINK: ROUTES.UK_CONTENT_PERCENTAGE,
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
    PRE_CREDIT_PERIOD: {
      ID: PRE_CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[PRE_CREDIT_PERIOD],
    },
    CREDIT_PERIOD: {
      ID: CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[CREDIT_PERIOD],
    },
    POLICY_TYPE: {
      ID: POLICY_TYPE,
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
  if (submittedData) {
    mappedCurrencies = mapCurrencies(currencies, submittedData[FIELD_IDS.CURRENCY]);
  } else {
    mappedCurrencies = mapCurrencies(currencies);
  }

  return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, {
    ...PAGE_VARIABLES,
    currencies: mappedCurrencies,
    submittedValues: mapSubmittedValues(submittedData),
  });
};

const post = async (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    const currencies = await api.getCurrencies();
    const mappedCurrencies = mapCurrencies(currencies, req.body[FIELD_IDS.CURRENCY]);

    return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, {
      ...PAGE_VARIABLES,
      currencies: mappedCurrencies,
      validationErrors,
      submittedValues: req.body,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
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

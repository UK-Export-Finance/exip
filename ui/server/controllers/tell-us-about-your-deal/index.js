const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES, ROUTES, FIELD_IDS } = require('../../constants');
const api = require('../../api');
const mapCurrencies = require('../../helpers/map-currencies');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

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
      ID: FIELD_IDS.AMOUNT_CURRENCY,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.AMOUNT_CURRENCY],
    },
    CURRENCY: {
      ID: FIELD_IDS.CURRENCY,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CURRENCY],
    },
    AMOUNT: {
      ID: FIELD_IDS.AMOUNT,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.AMOUNT],
    },
    PRE_CREDIT_PERIOD: {
      ID: FIELD_IDS.PRE_CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.PRE_CREDIT_PERIOD],
    },
    CREDIT_PERIOD: {
      ID: FIELD_IDS.CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CREDIT_PERIOD],
    },
    SINGLE_POLICY_LENGTH: {
      ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
    },
    MULTI_POLICY_LENGTH: {
      ID: FIELD_IDS.MULTI_POLICY_LENGTH,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
    },
    POLICY_TYPE: {
      ID: FIELD_IDS.POLICY_TYPE,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
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
    submittedValues: submittedData,
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

  // TODO: have a single "policyLength" field instead of seperated.

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

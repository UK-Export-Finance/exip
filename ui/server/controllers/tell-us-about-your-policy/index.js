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
const getPercentagesOfCover = require('../../helpers/get-percentages-of-cover');
const mapPercentageOfCover = require('../../helpers/map-percentage-of-cover');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const {
  AMOUNT,
  AMOUNT_CURRENCY,
  BUYER_COUNTRY,
  CREDIT_PERIOD,
  CURRENCY,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
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
    PERCENTAGE_OF_COVER: {
      ID: PERCENTAGE_OF_COVER,
      ...CONTENT_STRINGS.FIELDS[PERCENTAGE_OF_COVER],
    },
    CREDIT_PERIOD: {
      ID: CREDIT_PERIOD,
      ...CONTENT_STRINGS.FIELDS[CREDIT_PERIOD],
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

  const percentagesOfCover = getPercentagesOfCover(
    submittedData[POLICY_TYPE],
    submittedData[BUYER_COUNTRY].riskCategory,
  );

  let mappedPercentageOfCover;

  if (submittedData && submittedData[PERCENTAGE_OF_COVER]) {
    mappedPercentageOfCover = mapPercentageOfCover(percentagesOfCover, submittedData[PERCENTAGE_OF_COVER]);
  } else {
    mappedPercentageOfCover = mapPercentageOfCover(percentagesOfCover);
  }

  return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    currencies: mappedCurrencies,
    percentageOfCover: mappedPercentageOfCover,
    submittedValues: submittedData,
  });
};

const post = async (req, res) => {
  const { submittedData } = req.session;
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

    const percentagesOfCover = getPercentagesOfCover(
      submittedData[POLICY_TYPE],
      submittedData[BUYER_COUNTRY].riskCategory,
    );

    const submittedPercentageOfCover = req.body[PERCENTAGE_OF_COVER];

    let mappedPercentageOfCover;

    if (submittedPercentageOfCover) {
      mappedPercentageOfCover = mapPercentageOfCover(percentagesOfCover, submittedPercentageOfCover);
    } else {
      mappedPercentageOfCover = mapPercentageOfCover(percentagesOfCover);
    }

    return res.render(TEMPLATES.TELL_US_ABOUT_YOUR_POLICY, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
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
  PAGE_VARIABLES,
  get,
  post,
};

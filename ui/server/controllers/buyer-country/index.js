const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const api = require('../../api');
const { mapCountries } = require('../../helpers/map-countries');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const isChangeRoute = require('../../helpers/is-change-route');
const getCountryByName = require('../../helpers/get-country-by-name');
const isCountrySupported = require('../../helpers/is-country-supported');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELD_IDS.COUNTRY,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.BUYER_COUNTRY_PAGE,
};

const get = async (req, res) => {
  const { submittedData } = req.session;
  const countries = await api.getCountries();

  let mappedCountries;
  if (submittedData && submittedData[FIELD_IDS.BUYER_COUNTRY]) {
    mappedCountries = mapCountries(countries, submittedData[FIELD_IDS.BUYER_COUNTRY].isoCode);
  } else {
    mappedCountries = mapCountries(countries);
  }

  return res.render(TEMPLATES.BUYER_COUNTRY, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
    countries: mappedCountries,
    submittedValues: req.session.submittedData,
    isChangeRoute: isChangeRoute(req.originalUrl),
  });
};

const post = async (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  const countries = await api.getCountries();
  const mappedCountries = mapCountries(countries);

  if (validationErrors) {
    return res.render(TEMPLATES.BUYER_COUNTRY, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
      countries: mappedCountries,
      validationErrors,
      isChangeRoute: isChangeRoute(req.originalUrl),
    });
  }

  const submittedCountryName = req.body[FIELD_IDS.BUYER_COUNTRY];

  const country = getCountryByName(mappedCountries, submittedCountryName);

  const countryIsSupported = isCountrySupported(country);

  if (!countryIsSupported) {
    req.flash('previousRoute', ROUTES.BUYER_COUNTRY);

    const { PAGES } = CONTENT_STRINGS;
    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

    req.flash('exitReason', reason);

    return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
  }

  const populatedData = {
    ...req.body,
    [FIELD_IDS.BUYER_COUNTRY]: {
      name: country.name,
      isoCode: country.isoCode,
      riskCategory: country.riskCategory,
    },
  };

  req.session.submittedData = updateSubmittedData(
    populatedData,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.COMPANY_BASED);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

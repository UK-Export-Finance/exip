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

/**
 * getBackLink
 * If the user has come from the base root of the application (which redirects to this route)
 * Return the "Before you start" page, which is the original, external URL.
 * An empty base root is required to refresh req.session data.
 * This cannot be done in the first page (Buyer country) because there are scenarios/flows where the data needs to be populated.
 * Otherwise:
 * - if user has come from Check Answers page, return the same URL.
 * - if it's Buyer country route, user has submitted the form and has validation errors.
 * @param {referer} Previous URL
 * @returns {String} URL
 */
const getBackLink = (referer) => {
  if (!referer) {
    return CONTENT_STRINGS.LINKS.EXTERNAL.BEFORE_YOU_START;
  }

  if (referer.includes(ROUTES.CHECK_YOUR_ANSWERS)) {
    return referer;
  }

  if (referer.includes(ROUTES.BUYER_COUNTRY)) {
    return referer;
  }

  return CONTENT_STRINGS.LINKS.EXTERNAL.BEFORE_YOU_START;
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
    BACK_LINK: getBackLink(req.headers.referer),
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
      BACK_LINK: getBackLink(req.headers.referer),
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
  getBackLink,
  get,
  post,
};

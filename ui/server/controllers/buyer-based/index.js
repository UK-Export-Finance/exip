const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const api = require('../../api');
const mapCountries = require('../../helpers/map-countries');
const { validation: generateValidationErrors } = require('./validation');
const getCountryByName = require('../../helpers/get-country-by-name');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELD_IDS.COUNTRY,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.BUYER_BASED_PAGE,
  BACK_LINK: ROUTES.COMPANY_BASED,
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

  return res.render(TEMPLATES.BUYER_BASED, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
    countries: mappedCountries,
    submittedValues: req.session.submittedData,
  });
};

const post = async (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  const countries = await api.getCountries();

  if (validationErrors) {
    const mappedCountries = mapCountries(countries);

    return res.render(TEMPLATES.BUYER_BASED, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
      countries: mappedCountries,
      validationErrors,
    });
  }

  const submittedCountryName = req.body[FIELD_IDS.BUYER_COUNTRY];

  const populatedData = {
    ...req.body,
    [FIELD_IDS.BUYER_COUNTRY]: getCountryByName(countries, submittedCountryName),
  };

  req.session.submittedData = updateSubmittedData(
    populatedData,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.TRIED_TO_OBTAIN_COVER);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

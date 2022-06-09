const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const api = require('../../api');
const mapCountries = require('../../helpers/map-countries');
const { validation: generateValidationErrors } = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELD_IDS.COUNTRY,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.FINAL_DESTINATION_PAGE,
  BACK_LINK: ROUTES.TRIED_TO_OBTAIN_COVER,
};

const get = async (req, res) => {
  const { submittedData } = req.session;
  const countries = await api.getCountries();

  let mappedCountries;
  if (submittedData) {
    mappedCountries = mapCountries(countries, submittedData[FIELD_IDS.FINAL_DESTINATION]);
  } else {
    mappedCountries = mapCountries(countries);
  }

  return res.render(TEMPLATES.FINAL_DESTINATION, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    HIDDEN_FIELD_NAME: FIELD_IDS.FINAL_DESTINATION,
    countries: mappedCountries,
    submittedValues: req.session.submittedData,
  });
};

const post = async (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    const countries = await api.getCountries();
    const mappedCountries = mapCountries(countries);

    return res.render(TEMPLATES.FINAL_DESTINATION, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      HIDDEN_FIELD_NAME: FIELD_IDS.FINAL_DESTINATION,
      countries: mappedCountries,
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.UK_CONTENT_PERCENTAGE);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

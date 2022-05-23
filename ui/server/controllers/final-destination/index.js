const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const api = require('../../api');
const mapCountries = require('../../helpers/map-countries');
const { validation: generateValidationErrors } = require('./validation');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELDS.COUNTRY,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.FINAL_DESTINATION_PAGE,
  BACK_LINK: ROUTES.TRIED_TO_OBTAIN_COVER,
};

const get = async (req, res) => {
  const countries = await api.getCountries();
  const mappedCountries = mapCountries(countries);

  return res.render(TEMPLATES.FINAL_DESTINATION, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    HIDDEN_FIELD_NAME: FIELDS.FINAL_DESTINATION,
    countries: mappedCountries,
  });
};

const post = async (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    const countries = await api.getCountries();
    const mappedCountries = mapCountries(countries);

    return res.render(TEMPLATES.FINAL_DESTINATION, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      HIDDEN_FIELD_NAME: FIELDS.FINAL_DESTINATION,
      countries: mappedCountries,
      validationErrors,
    });
  }

  return res.redirect(ROUTES.UK_CONTENT_PERCENTAGE);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

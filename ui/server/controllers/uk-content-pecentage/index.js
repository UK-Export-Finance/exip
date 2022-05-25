const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELDS.UK_CONTENT_PERCENTAGE,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.UK_CONTENT_PERCENTAGE_PAGE,
  BACK_LINK: ROUTES.FINAL_DESTINATION,
};

const get = (req, res) =>
  res.render(TEMPLATES.UK_CONTENT_PERCENTAGE, singleInputPageVariables(PAGE_VARIABLES));

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.UK_CONTENT_PERCENTAGE, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      validationErrors,
    });
  }

  return res.redirect(ROUTES.TELL_US_ABOUT_YOUR_DEAL);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

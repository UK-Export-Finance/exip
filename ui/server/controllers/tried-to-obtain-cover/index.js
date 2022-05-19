const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELDS.TRIED_PRIVATE_COVER,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.TRIED_TO_OBTAIN_COVER_PAGE,
  BACK_LINK: ROUTES.BUYER_BASED,
};

const get = (req, res) =>
  res.render(TEMPLATES.TRIED_TO_OBTAIN_COVER, singleInputPageVariables(PAGE_VARIABLES));

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.TRIED_TO_OBTAIN_COVER, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      validationErrors,
    });
  }

  return res.redirect(ROUTES.FINAL_DESTINATION);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

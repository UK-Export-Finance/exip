const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELDS.VALID_BUYER_BASE,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.BUYER_BASED_PAGE,
  BACK_LINK: ROUTES.COMPANY_BASED,
};

const get = (req, res) =>
  res.render(TEMPLATES.BUYER_BASED, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.BUYER_BASED, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (req.body[FIELDS.VALID_BUYER_BASE] === 'false') {
    return res.redirect(ROUTES.BUYER_BASED_UNAVAILABLE);
  }

  return res.redirect(ROUTES.TRIED_TO_OBTAIN_COVER);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

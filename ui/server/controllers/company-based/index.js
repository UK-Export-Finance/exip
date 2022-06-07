const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELDS.VALID_COMPANY_BASE,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.COMPANY_BASED_PAGE,
  BACK_LINK: ROUTES.BEFORE_YOU_START,
};

const get = (req, res) =>
  res.render(TEMPLATES.COMPANY_BASED, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.COMPANY_BASED, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (req.body[FIELDS.VALID_COMPANY_BASE] === 'false') {
    return res.redirect(ROUTES.COMPANY_BASED_UNAVAILABLE);
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  return res.redirect(ROUTES.BUYER_BASED);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

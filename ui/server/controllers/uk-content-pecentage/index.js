const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELD_IDS.UK_CONTENT_PERCENTAGE,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.UK_CONTENT_PERCENTAGE_PAGE,
  BACK_LINK: ROUTES.FINAL_DESTINATION,
};

const get = (req, res) =>
  res.render(TEMPLATES.UK_CONTENT_PERCENTAGE, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.UK_CONTENT_PERCENTAGE, {
      ...singleInputPageVariables(PAGE_VARIABLES),
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

  return res.redirect(ROUTES.TELL_US_ABOUT_YOUR_DEAL);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

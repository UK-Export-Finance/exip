const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELD_IDS.VALID_BUYER_BASE,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.BUYER_BASED_PAGE,
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

  if (req.body[FIELD_IDS.VALID_BUYER_BASE] === 'false') {
    return res.redirect(ROUTES.BUYER_BASED_UNAVAILABLE);
  }

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

const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const PAGE_VARIABLES = {
  FIELD_NAME: FIELD_IDS.VALID_COMPANY_BASE,
  PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.COMPANY_BASED_PAGE,
};

const get = (req, res) =>
  res.render(TEMPLATES.COMPANY_BASED, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.COMPANY_BASED, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  const answer = req.body[FIELD_IDS.VALID_COMPANY_BASE];

  if (answer === 'false') {
    req.flash('previousRoute', ROUTES.VALID_COMPANY_BASE);

    const { PAGES } = CONTENT_STRINGS;
    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
  }

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.BUYER_BASED);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

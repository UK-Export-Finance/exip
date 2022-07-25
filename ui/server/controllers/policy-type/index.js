const CONTENT_STRINGS = require('../../content-strings');
const {
  FIELD_IDS,
  ROUTES,
  TEMPLATES,
} = require('../../constants');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const isChangeRoute = require('../../helpers/is-change-route');

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    BUTTONS: CONTENT_STRINGS.BUTTONS,
    ...CONTENT_STRINGS.PAGES.POLICY_TYPE_PAGE,
  },
  FIELDS: {
    POLICY_TYPE: {
      ID: FIELD_IDS.POLICY_TYPE,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
    },
    SINGLE_POLICY_TYPE: {
      ID: FIELD_IDS.SINGLE_POLICY_TYPE,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
    },
    SINGLE_POLICY_LENGTH: {
      ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
    },
    MULTI_POLICY_LENGTH: {
      ID: FIELD_IDS.MULTI_POLICY_LENGTH,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
    },
  },
};

const get = (req, res) =>
  res.render(TEMPLATES.POLICY_TYPE, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.POLICY_TYPE, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      validationErrors,
      submittedValues: req.body,
    });
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.TELL_US_ABOUT_YOUR_POLICY);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

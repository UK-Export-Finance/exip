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
    LINKS: CONTENT_STRINGS.LINKS,
    ...CONTENT_STRINGS.PAGES.CAN_GET_PRIVATE_INSURANCE_PAGE,
  },
  FIELDS: {
    CAN_GET_PRIVATE_INSURANCE: {
      ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
    },
    // note: "tried private cover yes" is only required for scenario where
    // empty form is submitted. Then, error message link can link to
    // the first policy type radio button (single).
    CAN_GET_PRIVATE_INSURANCE_YES: {
      ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
      ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES],
    },
  },
};

const get = (req, res) =>
  res.render(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE];

  const redirectToExitPage = (answer === 'true');

  if (redirectToExitPage) {
    req.flash('previousRoute', ROUTES.CAN_GET_PRIVATE_INSURANCE);

    const { PAGES } = CONTENT_STRINGS;
    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    req.flash('exitReason', REASON.CAN_GET_PRIVATE_INSURANCE);

    return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

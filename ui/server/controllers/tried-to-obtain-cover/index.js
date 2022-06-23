const CONTENT_STRINGS = require('../../content-strings');
const {
  FIELD_IDS,
  FIELD_VALUES,
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
    ...CONTENT_STRINGS.PAGES.TRIED_TO_OBTAIN_COVER_PAGE,
  },
  FIELD: {
    ID: FIELD_IDS.TRIED_PRIVATE_COVER,
    ...CONTENT_STRINGS.FIELDS[FIELD_IDS.TRIED_PRIVATE_COVER],
  },
};

const get = (req, res) =>
  res.render(TEMPLATES.TRIED_TO_OBTAIN_COVER, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.TRIED_TO_OBTAIN_COVER, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.TRIED_PRIVATE_COVER];

  const redirectToExitPage = (answer === 'false' || answer === FIELD_VALUES.TRIED_PRIVATE_COVER.NOT_TRIED);

  if (redirectToExitPage) {
    req.flash('previousRoute', ROUTES.TRIED_TO_OBTAIN_COVER);

    const { PAGES } = CONTENT_STRINGS;
    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    if (answer === 'false') {
      req.flash('exitReason', REASON.CAN_GET_PRIVATE_INSURANCE);

      return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
    }

    if (answer === FIELD_VALUES.TRIED_PRIVATE_COVER.NOT_TRIED) {
      req.flash('exitReason', REASON.HAVE_NOT_TRIED_PRIVATE_INSURANCE);

      return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
    }
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.UK_CONTENT_PERCENTAGE);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

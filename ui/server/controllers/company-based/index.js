const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');
const generateValidationErrors = require('./validation');

const get = (req, res) =>
  res.render('company-based.njk', {
    CONTENT_STRINGS: {
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.COMPANY_BASED_PAGE,
    },
    BACK_LINK: CONSTANTS.ROUTES.BEFORE_YOU_START,
    FIELD_NAME: CONSTANTS.FIELDS.VALID_COMPANY_BASE,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render('company-based.njk', {
      CONTENT_STRINGS: {
        BUTTONS: CONTENT_STRINGS.BUTTONS,
        LINKS: CONTENT_STRINGS.LINKS,
        ...CONTENT_STRINGS.COMPANY_BASED_PAGE,
      },
      BACK_LINK: CONSTANTS.ROUTES.BEFORE_YOU_START,
      FIELD_NAME: CONSTANTS.FIELDS.VALID_COMPANY_BASE,
      validationErrors,
    });
  }

  if (req.body[CONSTANTS.FIELDS.VALID_COMPANY_BASE] === 'false') {
    return res.redirect(CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE);
  }

  return res.redirect(CONSTANTS.ROUTES.BUYER_BASED);
};

module.exports = {
  get,
  post,
};

const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');
const generateValidationErrors = require('./validation');

const get = (req, res) =>
  res.render('buyer-based.njk', {
    CONTENT_STRINGS: {
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.BUYER_BASED_PAGE,
    },
    BACK_LINK: CONSTANTS.ROUTES.COMPANY_BASED,
    FIELD_NAME: CONSTANTS.FIELDS.VALID_BUYER_BASE,
  });

const post = (req, res) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render('buyer-based.njk', {
      CONTENT_STRINGS: {
        BUTTONS: CONTENT_STRINGS.BUTTONS,
        LINKS: CONTENT_STRINGS.LINKS,
        ...CONTENT_STRINGS.BUYER_BASED_PAGE,
      },
      BACK_LINK: CONSTANTS.ROUTES.COMPANY_BASED,
      FIELD_NAME: CONSTANTS.FIELDS.VALID_BUYER_BASE,
      validationErrors,
    });
  }

  if (req.body[CONSTANTS.FIELDS.VALID_BUYER_BASE] === 'false') {
    return res.redirect(CONSTANTS.ROUTES.BUYER_BASED_UNAVAILABLE);
  }

  return res.redirect(CONSTANTS.ROUTES.TRIED_TO_OBTAIN_COVER);
};

module.exports = {
  get,
  post,
};

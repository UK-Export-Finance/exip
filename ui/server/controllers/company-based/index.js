const CONTENT_STRINGS = require('../../content-strings');

const getCompanyBased = (req, res) =>
  res.render('company-based.njk', {
    CONTENT_STRINGS: CONTENT_STRINGS.COMPANY_BASED_PAGE,
  });

module.exports = getCompanyBased;

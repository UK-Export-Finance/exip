const CONTENT_STRINGS = require('../../content-strings');

const getCompanyBasedUnavailable = (req, res) =>
  res.render('company-based-unavailable.njk', {
    CONTENT_STRINGS: CONTENT_STRINGS.EXIT_PAGES.COMPANY_BASED,
  });

module.exports = getCompanyBasedUnavailable;

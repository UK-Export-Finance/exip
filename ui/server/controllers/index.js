const CONTENT_STRINGS = require('../../../content-strings');

const getIndex = (req, res) =>
  res.render('before-you-start.njk', {
    CONTENT_STRINGS: CONTENT_STRINGS.LANDING_PAGE,
  });

module.exports = getIndex;

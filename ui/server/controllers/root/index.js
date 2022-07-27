const { ROUTES } = require('../../constants');

const get = (req, res) => {
  // new submitted data session
  req.session.submittedData = {};

  return res.redirect(ROUTES.BUYER_COUNTRY);
};

module.exports = {
  get,
};

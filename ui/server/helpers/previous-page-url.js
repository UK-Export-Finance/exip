const isChangeRoute = require('./is-change-route');
const { ROUTES } = require('../constants');

const previousPageUrl = (reqUrl, previousFormUrl) => {
  if (isChangeRoute(reqUrl)) {
    return ROUTES.CHECK_YOUR_ANSWERS;
  }

  return previousFormUrl;
};

module.exports = previousPageUrl;

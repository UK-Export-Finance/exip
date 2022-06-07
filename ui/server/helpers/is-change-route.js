const getLastSubstring = require('./get-last-substring');

const isChangeRoute = (url) => {
  const lastSubstring = getLastSubstring(url);

  if (lastSubstring === 'change') {
    return true;
  }

  return false;
};

module.exports = isChangeRoute;

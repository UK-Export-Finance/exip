import getLastSubstring from '../get-last-substring';

/**
 * isChangeRoute
 * Check if the last part of a string/URL is 'change'
 * @param {String} URL
 * @returns {Boolean}
 */
const isChangeRoute = (url: string) => {
  const lastSubstring = getLastSubstring(url);

  if (lastSubstring === 'change') {
    return true;
  }

  return false;
};

export default isChangeRoute;

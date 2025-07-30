import getLastSubstring from '../get-last-substring';

/**
 * isChangeRoute
 * Check if the last part of a string/URL is 'change'
 * @param {string} URL
 * @returns {boolean}
 */
const isChangeRoute = (url: string) => {
  const lastSubstring = getLastSubstring(url);

  if (lastSubstring === 'change') {
    return true;
  }

  return false;
};

export default isChangeRoute;

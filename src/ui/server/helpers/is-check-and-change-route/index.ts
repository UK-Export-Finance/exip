import getLastSubstring from '../get-last-substring';

/**
 * isCheckAndChangeRoute
 * Check if the last part of a string/URL is 'check-and-change'
 * @param {string} URL
 * @returns {boolean}
 */
const isCheckAndChangeRoute = (url: string) => {
  const lastSubstring = getLastSubstring(url);

  if (lastSubstring === 'check-and-change') {
    return true;
  }

  return false;
};

export default isCheckAndChangeRoute;

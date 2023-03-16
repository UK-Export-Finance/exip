import getLastSubstring from '../get-last-substring';

/**
 * isCheckAndChangeRoute
 * Check if the last part of a string/URL is 'check-and-change'
 * @param {String} URL
 * @returns {Boolean}
 */
const isCheckAndChangeRoute = (url: string) => {
  const lastSubstring = getLastSubstring(url);

  if (lastSubstring === 'check-and-change') {
    return true;
  }

  return false;
};

export default isCheckAndChangeRoute;

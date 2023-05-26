import { INSURANCE_LOWERCASE } from '../../constants';

/**
 * isInsuranceRoute
 * checks if route has originalUrl or if the url contains insurance
 * if empty or contains insurance, then is an insurance route so returns true
 * if does not contain insurance, then returns false
 * @param {String} originalUrl of the page the user was on
 * @returns {Boolean}
 */
const isInsuranceRoute = (originalUrl?: string) => {
  if (!originalUrl) {
    return true;
  }

  // splits on / in url
  const originalUrlSplit = originalUrl.split('/');

  // checks that originalUrlSplit[1] exists
  if (originalUrlSplit.length > 1 && originalUrlSplit[1] === INSURANCE_LOWERCASE) {
    return true;
  }

  return false;
};

export default isInsuranceRoute;

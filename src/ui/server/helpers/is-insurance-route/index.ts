import { INSURANCE } from '../../constants';

/**
 * isInsuranceRoute
 * checks if route has ORIGINAL_URL or if the url contains insurance
 * if empty or contains insurance, then is an insurance route so returns true
 * if does not contain insurance, then returns false
 * @param {String} ORIGINAL_URL of the page the user is on
 * @returns {Boolean}
 */
const isInsuranceRoute = (ORIGINAL_URL?: string) => {
  if (!ORIGINAL_URL) {
    return true;
  }

  // splits on / in url
  const originalUrlSplit = ORIGINAL_URL.split('/');

  // checks that ORIGINAL_URLSplit[1] exists
  if (originalUrlSplit.length > 1 && originalUrlSplit[1] === INSURANCE.toLowerCase()) {
    return true;
  }

  return false;
};

export default isInsuranceRoute;

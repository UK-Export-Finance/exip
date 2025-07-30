import { APPLY } from '../../constants';

/**
 * isInsuranceRoute
 * checks if route has ORIGINAL_URL or if the url contains APPLY
 * if empty or contains APPLY, then is an APPLY route so returns true
 * if does not contain APPLY, then returns false
 * @param {string} ORIGINAL_URL: Current URL
 * @returns {boolean}
 */
const isInsuranceRoute = (ORIGINAL_URL?: string) => {
  if (!ORIGINAL_URL) {
    return true;
  }

  // splits on / in url
  const originalUrlSplit = ORIGINAL_URL.split('/');

  // checks that ORIGINAL_URLSplit[1] exists
  if (originalUrlSplit.length > 1 && originalUrlSplit[1] === APPLY.toLowerCase()) {
    return true;
  }

  return false;
};

export default isInsuranceRoute;

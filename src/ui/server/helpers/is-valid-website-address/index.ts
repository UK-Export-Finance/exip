import isUrl from 'is-url';
import { isAboveMaxLength } from '../string';

/**
 * isValidWebsiteAddress
 * Check if a website address is valid
 * @param {string} Website address
 * @returns {boolean} errors
 */
const isValidWebsiteAddress = (websiteAddress: string) => {
  if (isUrl(websiteAddress) && !isAboveMaxLength(websiteAddress, 191)) {
    return true;
  }

  return false;
};

export default isValidWebsiteAddress;

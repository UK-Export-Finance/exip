import isUrl from 'is-url';
import isAboveMaxLength from '../is-above-max-length';

/**
 * isValidWebsiteAddress
 * Check if a website address is valid
 * @param {String} Website address
 * @returns {Boolean} errors
 */
const isValidWebsiteAddress = (websiteAddress: string) => {
  if (isUrl(websiteAddress) && !isAboveMaxLength(websiteAddress, 191)) {
    return true;
  }

  return false;
};

export default isValidWebsiteAddress;

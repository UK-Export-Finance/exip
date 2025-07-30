import isUrl from 'is-url';
import getUrlOrigin from '../get-url-origin';

/**
 * Check if a request header's origin is:
 * 1) A valid URL
 * 2) Matches the services' origin
 * @param {string} True URL origin
 * @param {string} Provided request header URL
 * @returns {boolean}
 */
const isRequestHeaderOriginValid = (origin: string, requestHeader: string) => {
  if (isUrl(requestHeader)) {
    const requestOrigin = getUrlOrigin(requestHeader);

    if (requestOrigin === origin) {
      return true;
    }
  }

  return false;
};

export default isRequestHeaderOriginValid;

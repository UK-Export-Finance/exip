import isUrl from 'is-url';

/**
 * Get a URL's origin by splitting the following characters:
 * 1) /
 * 2) :
 * 3) .
 * This ensures that the split will work for all environments including localhost.
 * @param {string} URL
 * @returns {string} URL origin
 */
const getUrlOrigin = (url: string) => {
  if (isUrl(url)) {
    const origin = url.split(/[/:]/);

    return origin[3];
  }

  return '';
};

export default getUrlOrigin;

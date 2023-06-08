import { QUOTE } from '../../constants';

/**
 * isQuoteRoute
 * checks if url contains quote
 * if it contains quote, then is a quote route and returns true
 * if does not contain quote, then returns false
 * @param {String} url of the page the user is on
 * @returns {Boolean}
 */
const isQuoteRoute = (url: string) => {
  // splits on / in url
  const urlSplit = url.split('/');

  // checks that ORIGINAL_URLSplit[1] exists
  if (urlSplit.length > 1 && urlSplit[1] === QUOTE.toLowerCase()) {
    return true;
  }

  return false;
};

export default isQuoteRoute;

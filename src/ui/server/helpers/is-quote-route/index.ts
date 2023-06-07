import { QUOTE } from '../../constants';

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

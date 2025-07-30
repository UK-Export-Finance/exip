import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { MVP_INSURANCE_ROOT, INSURANCE_ROOT } = INSURANCE_ROUTES;

/**
 * generateRedirectUrl
 * Replace a URL that contains MVP_INSURANCE_ROOT with INSURANCE_ROOT
 * Note: we should only replace one instance of MVP_INSURANCE_ROOT.
 * This is because some URLs have a child "insurance" route that should NOT be replaced.
 * @param {string} Original URL
 * @returns {string}
 */
const generateRedirectUrl = (originalUrl: string) => {
  const newUrl = originalUrl.replace(MVP_INSURANCE_ROOT, INSURANCE_ROOT);

  return newUrl;
};

export default generateRedirectUrl;

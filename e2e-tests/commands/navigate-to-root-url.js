import { ROUTES } from '../constants';

/**
 * navigateToRootUrl
 * Navigate to the root URL.
 */
const navigateToRootUrl = () => {
  cy.navigateToUrl(ROUTES.ROOT);
};

export default navigateToRootUrl;

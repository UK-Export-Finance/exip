import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * navigateToDashboardUrl
 * Navigate to the "dashboard" URL
 * @returns {Window}
 */
const navigateToDashboardUrl = () => {
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  cy.navigateToUrl(dashboardUrl);
};

export default navigateToDashboardUrl;

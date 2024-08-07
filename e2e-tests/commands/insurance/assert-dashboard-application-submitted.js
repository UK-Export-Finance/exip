import header from '../../partials/header';

/**
 * assertDashboardApplicationSubmitted
 * Assert that in the dashboard, a submitted application has:
 * 1) A "submitted" status
 * 2) No link to the application
 * @param {Number} Application reference number
 */
const assertDashboardApplicationSubmitted = (referenceNumber) => {
  cy.navigateToDashboardUrl();

  header.navigation.applications().click();

  cy.assertDashboardApplicationSubmittedStatus(referenceNumber);
  cy.assertDashboardApplicationNumberLinkDoesNotExist(referenceNumber);
};

export default assertDashboardApplicationSubmitted;

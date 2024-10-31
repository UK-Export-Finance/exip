/**
 * assertDashboardApplicationSubmitted
 * Assert that in the dashboard, a submitted application has:
 * 1) A "submitted" status
 * 2) No link to the application
 * @param {Number} referenceNumber: Application reference number
 */
const assertDashboardApplicationSubmitted = (referenceNumber) => {
  cy.navigateToDashboardUrl();

  cy.clickHeaderApplicationsLink();

  cy.assertDashboardApplicationSubmittedStatus(referenceNumber);
  cy.assertDashboardApplicationNumberLinkDoesNotExist(referenceNumber);
};

export default assertDashboardApplicationSubmitted;

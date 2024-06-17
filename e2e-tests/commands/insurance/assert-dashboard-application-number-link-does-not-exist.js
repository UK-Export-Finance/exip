import dashboardPage from '../../pages/insurance/dashboard';

const { table } = dashboardPage;

/**
 * assertDashboardApplicationNumberLinkDoesNotExist
 * Assert that an application does NOT have a link in the dashboard.
 * @param {Number} Application reference number
 */
const assertDashboardApplicationNumberLinkDoesNotExist = (referenceNumber) => {
  table.body.row(referenceNumber).submittedLink().should('not.exist');

  cy.checkText(table.body.row(referenceNumber).referenceNumber(), referenceNumber);
};

export default assertDashboardApplicationNumberLinkDoesNotExist;

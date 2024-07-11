import dashboardPage from '../../pages/insurance/dashboard';
import { APPLICATION } from '../../constants';

const { table } = dashboardPage;

/**
 * assertDashboardApplicationSubmittedStatus
 * Assert that an application has a "submitted" status in the dashboard.
 * @param {Number} Application reference number
 */
const assertDashboardApplicationSubmittedStatus = (referenceNumber) => {
  const cell = table.body.row(referenceNumber).status();

  cy.checkText(cell, APPLICATION.STATUS.SUBMITTED);
};

export default assertDashboardApplicationSubmittedStatus;

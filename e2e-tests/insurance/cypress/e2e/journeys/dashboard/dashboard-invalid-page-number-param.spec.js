import dashboardPage from '../../../../../pages/insurance/dashboard';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { table } = dashboardPage;
const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

context('Insurance - Dashboard - visit with 1 existing application and an invalid page number param', () => {
  const baseUrl = Cypress.config('baseUrl');

  let referenceNumber;
  const dashboardPageUrl = `${baseUrl}${DASHBOARD_PAGE}`;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ refNumber }) => {
      referenceNumber = refNumber;

      const invalidUrl = `${dashboardPageUrl}/not-a-number`;

      cy.navigateToUrl(invalidUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should ignore the invalid page number and have one application in the table', () => {
    table.body.rows().should('have.length', 1);
  });
});

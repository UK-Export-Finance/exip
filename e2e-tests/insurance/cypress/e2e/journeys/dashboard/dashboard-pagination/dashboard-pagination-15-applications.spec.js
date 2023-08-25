import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE;

context(`Insurance - Dashboard - pagination - ${totalApplications} applications`, () => {
  let referenceNumber;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications);

      cy.navigateToUrl(dashboardUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    // TODO delete applications
    cy.deleteApplication(referenceNumber);
  });

  it(`should NOT render pagination list items because there are no more than ${MAX_APPLICATIONS_PER_PAGE} applications`, () => {
    cy.assertPaginationDoesNotExist();
  });
});

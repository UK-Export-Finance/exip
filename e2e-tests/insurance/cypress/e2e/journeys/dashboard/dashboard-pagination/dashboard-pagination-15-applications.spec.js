import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE;

const dashboardUrl = `${baseUrl}${DASHBOARD}`;

context(`Insurance - Dashboard - pagination - ${totalApplications} applications`, () => {
  let applications;
  let abandonedApplication;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

      // creates an abandoned application
      cy.createAnAbandonedApplication(accountId).then((createdApplication) => {
        abandonedApplication = createdApplication;
      });

      cy.navigateToUrl(dashboardUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplications(applications);
    cy.deleteApplication(abandonedApplication.referenceNumber);
  });

  it(`should NOT render pagination list items because there are no more than ${MAX_APPLICATIONS_PER_PAGE} applications (which are not Abandoned)`, () => {
    cy.assertPaginationDoesNotExist();
  });
});

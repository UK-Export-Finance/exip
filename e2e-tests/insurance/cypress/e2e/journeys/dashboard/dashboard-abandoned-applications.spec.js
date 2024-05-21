import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { APPLICATION } from '../../../../../constants/application';
import dashboardPage from '../../../../../pages/insurance/dashboard';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = 1;

const dashboardUrl = `${baseUrl}${DASHBOARD}`;

const { table } = dashboardPage;

context(`Insurance - Dashboard - pagination - 1 ${IN_PROGRESS} application and 1 ${ABANDONED} application`, () => {
  let applications;
  let abandonedApplication;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

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

  it(`should render 1 ${IN_PROGRESS} application on the dashboard`, () => {
    cy.assertLength(table.body.rows(), totalApplications);
    dashboardPage.table.body.row(applications[0].referenceNumber).status();
  });
});

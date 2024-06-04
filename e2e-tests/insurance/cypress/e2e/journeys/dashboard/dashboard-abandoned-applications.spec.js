import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { APPLICATION } from '../../../../../constants/application';
import dashboardPage from '../../../../../pages/insurance/dashboard';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalExpectedApplications = 1;

const dashboardUrl = `${baseUrl}${DASHBOARD}`;

const { table } = dashboardPage;

context(`Insurance - Dashboard - pagination - 1 ${IN_PROGRESS} application and 1 ${ABANDONED} application`, () => {
  let abandonedApplication;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber, accountId }) => {
      referenceNumber = refNumber;

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
    cy.deleteApplication(referenceNumber);
    cy.deleteApplication(abandonedApplication.referenceNumber);
  });

  it(`should render 1 ${IN_PROGRESS} application on the dashboard`, () => {
    cy.assertLength(table.body.rows(), totalExpectedApplications);
    cy.checkText(dashboardPage.table.body.row(referenceNumber).status(), IN_PROGRESS);
  });
});

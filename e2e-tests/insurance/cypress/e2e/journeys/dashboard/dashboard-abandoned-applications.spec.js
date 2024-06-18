import { APPLICATION } from '../../../../../constants/application';
import dashboardPage from '../../../../../pages/insurance/dashboard';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

const totalExpectedApplications = 1;

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

      cy.navigateToDashboardUrl();
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

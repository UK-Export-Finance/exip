import dashboardPage from '../../../../../../pages/insurance/dashboard';
import header from '../../../../../../partials/header';
import { APPLICATION } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { table } = dashboardPage;

const { DASHBOARD, APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - submit an application - Single policy type, no broker - As an Exporter, I want to submit my completed export insurance application, So that UKEF can process and make a decision on my application', () => {
  let referenceNumber;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({}).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });

  describe('when visiting the dashboard', () => {
    const submittedStatus = APPLICATION.STATUS.SUBMITTED;

    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      header.navigation.applications().click();
    });

    it(`should render the application's status as ${submittedStatus}`, () => {
      const cell = table.body.row(referenceNumber).status();

      cy.checkText(cell, submittedStatus);
    });

    it('should not render a link for the application number', () => {
      table.body.row(referenceNumber).submittedLink().should('not.exist');

      cy.checkText(table.body.row(referenceNumber).referenceNumber(), referenceNumber);
    });
  });
});

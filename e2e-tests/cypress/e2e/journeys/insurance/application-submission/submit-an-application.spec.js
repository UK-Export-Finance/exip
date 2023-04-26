import dashboardPage from '../../../pages/insurance/dashboard';
import header from '../../../partials/header';
import { APPLICATION } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { table } = dashboardPage;

const {
  ROOT: INSURANCE_ROOT,
  DASHBOARD,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

context('Insurance - application submitted page - As an Exporter, I want to submit my completed export insurance application, So that UKEF can process and make a decision on my application', () => {
  let referenceNumber;
  let url;

  const dashboardUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndSubmitAnApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

    cy.url().should('eq', expectedUrl);
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
  });

  // TODO: check if to move or delete
  // describe('when going back to the application', () => {
  //   beforeEach(() => {
  //     cy.navigateToUrl(dashboardUrl);

  //     const applicationLink = table.body.row(referenceNumber).referenceNumber();

  //     applicationLink.click();
  //   });

  //   it(`should render 'initial checks' task statuses as ${COMPLETED}`, () => {
  //     cy.checkTaskStatus(initialChecks.tasks.eligibility, COMPLETED);
  //   });

  //   it(`should render 'prepare application' task statuses as ${COMPLETED}`, () => {
  //     cy.checkTaskStatus(prepareApplication.tasks.policyTypeAndExports, COMPLETED);
  //     cy.checkTaskStatus(prepareApplication.tasks.exporterBusiness, COMPLETED);
  //     cy.checkTaskStatus(prepareApplication.tasks.buyer, COMPLETED);
  //   });

  //   it(`should render 'submit application' task statuses as ${COMPLETED}`, () => {
  //     cy.checkTaskStatus(submitApplication.tasks.checkAnswers, COMPLETED);
  //     cy.checkTaskStatus(submitApplication.tasks.declarationsAndSubmit, COMPLETED);
  //   });
  // });
});

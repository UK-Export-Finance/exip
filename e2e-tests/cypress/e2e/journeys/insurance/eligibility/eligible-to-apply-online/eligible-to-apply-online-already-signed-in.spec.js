import dashboardPage from '../../../../pages/insurance/dashboard';
import header from '../../../../partials/header';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

context("Insurance - Eligibility - You are eligible to apply online page - As an Exporter, I want the system to show the task list page for the Export Insurance Application that I have just completed its online eligibility check, if I'm signed in into my UKEF digital service account when completing the eligibility check, So that I can progress and complete my Export Insurance Application online", () => {
  let referenceNumbers;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumbers = [refNumber];
      // go back to dashboard
      header.navigation.applications().click();

      // start new application/eligibility flow
      dashboardPage.startNewApplicationButton().click();

      cy.submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    referenceNumbers.forEach((refNumber) => {
      cy.deleteApplication(refNumber);
    });

    cy.deleteAccount();
  });

  it("should redirect to the new application's `all sections` page", () => {
    cy.getReferenceNumber().then((newReferenceNumber) => {
      referenceNumbers = [...referenceNumbers, newReferenceNumber];

      const expectedUrl = `${Cypress.config('baseUrl')}${ROOT}/${newReferenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});

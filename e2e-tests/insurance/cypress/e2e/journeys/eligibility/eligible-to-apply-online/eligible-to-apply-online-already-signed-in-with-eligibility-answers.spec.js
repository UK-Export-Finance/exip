import dashboardPage from '../../../../../../pages/insurance/dashboard';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

context("Insurance - Eligibility - You are eligible to apply online page - user already signed in - As an Exporter, I want the system to show the task list page for the Export Insurance Application that I have just completed its online eligibility check, if I'm signed in into my UKEF digital service account when completing the eligibility check, So that I can progress and complete my Export Insurance Application online", () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(() => {
      // start new application/eligibility flow
      dashboardPage.startNewApplicationButton().click();

      cy.submitInsuranceEligibilityAnswersFromExporterLocationHappyPath();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);

    cy.deleteAccount();
  });

  it("should create an application and redirect to the new application's `all sections` page", () => {
    cy.getReferenceNumber().then((refNumber) => {
      referenceNumber = refNumber;

      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

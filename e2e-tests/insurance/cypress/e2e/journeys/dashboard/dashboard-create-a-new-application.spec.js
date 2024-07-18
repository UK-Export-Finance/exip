import dashboardPage from '../../../../../pages/insurance/dashboard';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
} = INSURANCE_ROUTES;

context('Insurance - Dashboard - Start new application button - As an Exporter, I want to start a new application from my dashboard', () => {
  const baseUrl = Cypress.config('baseUrl');

  let referenceNumbers;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumbers = [refNumber];

      cy.clickHeaderApplicationsLink();

      dashboardPage.startNewApplicationButton().click();

      cy.submitInsuranceEligibilityAnswersHappyPath();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    referenceNumbers.forEach((refNumber) => {
      cy.deleteApplication(refNumber);
    });
  });

  it('should redirect to the application and NOT the `do you already have an account` page', () => {
    cy.getReferenceNumber().then((refNumber) => {
      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

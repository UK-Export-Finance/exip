import dashboardPage from '../../../pages/insurance/dashboard';
import { submitButton } from '../../../pages/shared';
import header from '../../../partials/header';
import { ROUTES } from '../../../../../constants';

const {
  QUOTE: { YOUR_QUOTE },
} = ROUTES;

context('Insurance - Dashboard - Get a quote buton - As an Exporter, I want to visit the `Get a quote` tool from my dashboard, So that I can easily access the Get a Quote from the digital service.', () => {
  const baseUrl = Cypress.config('baseUrl');

  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      header.navigation.applications().click();

      dashboardPage.getAQuoteButton().click();

      cy.submitQuoteAnswersHappyPathSinglePolicy();

      submitButton().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should allow the user to complete the `get a quote` journey and get a quote', () => {
    const expectedUrl = `${baseUrl}${YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });
});

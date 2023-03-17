import dashboardPage from '../../../pages/insurance/dashboard';
import { backLink } from '../../../pages/shared';
import { ROUTES } from '../../../../../constants';

const { table } = dashboardPage;

const { DASHBOARD } = ROUTES.INSURANCE;

context('Insurance - Dashboard - new application', () => {
  let referenceNumbers;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumbers = [refNumber];

      url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      // TODO: EMS-1268 - when the authenticated header has been built, update this to click on the dashboard link.
      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();

    referenceNumbers.forEach((refNumber) => {
      cy.deleteApplication(refNumber);
    });
  });

  describe('when starting and completing insurance eligibility via the `start new` button ', () => {
    before(() => {
      dashboardPage.startNewApplication().click();

      cy.submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();

      // check we're on the dashboard and not the "do you have an account" page
      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);

      // go into the application, to get the reference number for deletion
      table.body.lastRow.referenceNumber().click();

      cy.getReferenceNumber().then((refNumber) => {
        referenceNumbers = [...referenceNumbers, refNumber];

        // go back to the dashboard
        backLink().click();
      });
    });

    it('should render the newly created application and the previously created application', () => {
      // check that the dashboard is now populated
      table.body.rows().should('have.length', 2);
    });
  });
});

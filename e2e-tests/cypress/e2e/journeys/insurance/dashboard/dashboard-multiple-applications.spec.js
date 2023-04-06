import dashboardPage from '../../../pages/insurance/dashboard';
import { backLink } from '../../../pages/shared';
import header from '../../../partials/header';
import { ROUTES } from '../../../../../constants';

const { table } = dashboardPage;

const { DASHBOARD } = ROUTES.INSURANCE;

context('Insurance - Dashboard - new application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      header.navigation.applications().click();

      cy.url().should('eq', url);

      table.body.rows().should('have.length', 1);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when starting and completing insurance eligibility via the `start new` button ', () => {
    let secondReferenceNumber;

    before(() => {
      dashboardPage.startNewApplication().click();

      cy.submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();

      // check we're on the dashboard and not the "do you have an account" page
      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);

      // go into the most recently created application to get the reference number for deletion
      table.body.firstRow.referenceNumber().click();

      cy.getReferenceNumber().then((refNumber) => {
        secondReferenceNumber = refNumber;

        // go back to the dashboard
        backLink().click();
      });
    });

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    after(() => {
      cy.deleteAccountAndApplication(secondReferenceNumber);
    });

    it('should render the newly created application and the previously created application', () => {
      table.body.rows().should('have.length', 2);
    });

    it('should order the applications in descending order', () => {
      let firstReferenceNumber;
      let lastReferenceNumber;

      table.body.firstRow.referenceNumber().invoke('text').then((text) => {
        firstReferenceNumber = Number(text);
      });

      table.body.lastRow.referenceNumber().invoke('text').then((text) => {
        lastReferenceNumber = Number(text);

        expect(firstReferenceNumber).to.be.greaterThan(lastReferenceNumber);
      });
    });
  });
});

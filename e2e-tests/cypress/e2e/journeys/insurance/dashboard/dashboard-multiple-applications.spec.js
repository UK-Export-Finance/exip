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

      table.body.rows().should('have.length', 1);
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

      // go into the most recently created application to get the reference number for deletion
      table.body.firstRow.referenceNumber().click();

      cy.getReferenceNumber().then((refNumber) => {
        referenceNumbers = [...referenceNumbers, refNumber];

        // go back to the dashboard
        backLink().click();
      });
    });

    beforeEach(() => {
      cy.navigateToUrl(url);
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

import dashboardPage from '../../../pages/insurance/dashboard';
import header from '../../../partials/header';
import { ROUTES } from '../../../../../constants';

const { table } = dashboardPage;

const { ROOT, ALL_SECTIONS, DASHBOARD } = ROUTES.INSURANCE;

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

      // get the reference number and check we're on the "all sections" and not the "do you have an account" page
      cy.getReferenceNumber().then((refNumber) => {
        referenceNumber = refNumber;

        const allSectionsUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        cy.url().should('eq', allSectionsUrl);
      });
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      header.navigation.applications().click();
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

      table.body.firstRow.referenceNumberLink().invoke('text').then((text) => {
        firstReferenceNumber = Number(text);
      });

      table.body.lastRow.referenceNumberLink().invoke('text').then((text) => {
        lastReferenceNumber = Number(text);

        expect(firstReferenceNumber).to.be.greaterThan(lastReferenceNumber);
      });
    });
  });
});

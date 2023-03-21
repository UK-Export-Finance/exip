import dashboardPage from '../../../pages/insurance/dashboard';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const {
  ROOT,
  DASHBOARD,
  ALL_SECTIONS,
  ELIGIBILITY,
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

context('Insurance - Dashboard - no applications', () => {
  let referenceNumber;
  const url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(() => {
      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it('should render `no applications` copy', () => {
    const selector = dashboardPage.noApplications();

    const expected = CONTENT_STRINGS.NO_APPLICATIONS;

    cy.checkText(selector, expected);
  });

  describe('`start new application` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render `start new application` link', () => {
      const selector = dashboardPage.startNewApplication();

      const expected = {
        href: ELIGIBILITY.BUYER_COUNTRY,
        copy: CONTENT_STRINGS.START_NEW_APPLICATION.TEXT,
      };

      cy.checkLink(selector, expected.href, expected.copy);
    });

    it(`should redirect to ${ELIGIBILITY.BUYER_COUNTRY}`, () => {
      dashboardPage.startNewApplication().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${ELIGIBILITY.BUYER_COUNTRY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  describe('when starting and completing insurance eligibility via the `start new` button ', () => {
    it('should create a new application and render in the dashboard', () => {
      cy.navigateToUrl(url);
      dashboardPage.startNewApplication().click();

      cy.submitInsuranceEligibilityAnswersHappyPath();

      // check we're on the dashboard and not the "do you have an account" page
      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);

      // check that the dashboard is now populated
      dashboardPage.table.body.rows().should('have.length', 1);

      // go into the new application
      dashboardPage.table.body.lastRow.referenceNumber().click();

      // get the reference number and assert the URL
      cy.getReferenceNumber().then((refNumber) => {
        referenceNumber = refNumber;

        const allSectionsUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        cy.url().should('eq', allSectionsUrl);
      });
    });
  });
});

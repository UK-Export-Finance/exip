import dashboardPage from '../../../../../pages/insurance/dashboard';
import header from '../../../../../partials/header';
import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { DASHBOARD, ELIGIBILITY } = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Dashboard - no applications', () => {
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(() => {
      cy.assertUrl(dashboardUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToDashboardUrl();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render `no applications` copy', () => {
    const selector = dashboardPage.noApplications();

    const expected = CONTENT_STRINGS.NO_APPLICATIONS;

    cy.checkText(selector, expected);
  });

  describe('`start new application` button', () => {
    beforeEach(() => {
      cy.navigateToDashboardUrl();
    });

    it('should render `start new application` link', () => {
      const selector = dashboardPage.startNewApplicationButton();

      const expected = {
        href: ELIGIBILITY.EXPORTER_LOCATION,
        copy: CONTENT_STRINGS.START_NEW_APPLICATION.TEXT,
      };

      cy.checkLink(selector, expected.href, expected.copy);
    });

    it(`should redirect to ${ELIGIBILITY.EXPORTER_LOCATION}`, () => {
      dashboardPage.startNewApplicationButton().click();

      const expectedUrl = `${baseUrl}${ELIGIBILITY.EXPORTER_LOCATION}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe('when starting and completing insurance eligibility via the `start new` button ', () => {
    it('should create a new application and render in the dashboard', () => {
      cy.navigateToDashboardUrl();
      dashboardPage.startNewApplicationButton().click();

      cy.submitInsuranceEligibilityAnswersHappyPath();

      // get the reference number and check we're on the "all sections" and not the "do you have an account" page
      cy.getReferenceNumber().then((refNumber) => {
        referenceNumber = refNumber;

        cy.assertAllSectionsUrl(referenceNumber);
      });

      // go to the dashboard
      header.navigation.applications().click();

      // check that the dashboard is now populated
      cy.assertLength(dashboardPage.table.body.rows(), 1);
    });
  });
});

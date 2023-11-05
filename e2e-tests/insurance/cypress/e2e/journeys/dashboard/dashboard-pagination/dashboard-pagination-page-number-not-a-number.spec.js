import { DEFAULT_PAGE_NUMBER, MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE;

const dashboardPageUrl = `${baseUrl}${DASHBOARD_PAGE}`;

context('Insurance - Dashboard - pagination - user navigates to the dashboard with a page number param that is not a number', () => {
  let applications;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

      cy.navigateToUrl(`${dashboardPageUrl}/not-a-number`);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplications(applications);
  });

  it(`should redirect to the dashboard with default page number (${DEFAULT_PAGE_NUMBER})`, () => {
    const expectedUrl = `${dashboardPageUrl}/${DEFAULT_PAGE_NUMBER}`;

    cy.assertUrl(expectedUrl);
  });
});

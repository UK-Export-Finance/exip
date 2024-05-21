import pagination from '../../../../../../partials/pagination';
import dashboardPage from '../../../../../../pages/insurance/dashboard';
import { MAX_APPLICATIONS_PER_PAGE, APPLICATION } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE + 1;
const totalPages = 2;

const dashboardUrl = `${baseUrl}${DASHBOARD}`;

const { table } = dashboardPage;

const { ABANDONED } = APPLICATION.STATUS;

context(`Insurance - Dashboard - pagination - ${totalApplications} applications and 1 abandoned application`, () => {
  let applications;
  let abandonedApplication;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

      cy.createAnAbandonedApplication(accountId).then((createdApplication) => {
        abandonedApplication = createdApplication;
      });

      cy.navigateToUrl(dashboardUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplications(applications);
    cy.deleteApplication(abandonedApplication.referenceNumber);
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);
    });

    it('should render 2 pagination list items with links', () => {
      cy.assertLength(pagination.listItems(), totalPages);

      cy.assertPaginationItemLink({ index: 0 });
      cy.assertPaginationItemLink({ index: 1 });
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        index: 0,
        expectedPageNumber: 1,
        previousLinkShouldExist: false,
        expectedUrl: `${baseUrl}${DASHBOARD}`,
      });
    });
  });

  describe('when clicking on the `next` pagination link', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      pagination.nextLink().click();
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        index: 2,
        expectedPageNumber: 2,
        nextLinkShouldExist: false,
      });
    });

    it(`should have 1 application on the dashboard (and not the ${ABANDONED} application)`, () => {
      cy.assertLength(table.body.rows(), 1);
    });
  });

  describe('when clicking on page 2 pagination link', () => {
    it('should have the correct pagination state', () => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(1).click();

      cy.assertPaginationState({
        totalPages,
        index: 2,
        expectedPageNumber: 2,
        nextLinkShouldExist: false,
      });
    });
  });
});

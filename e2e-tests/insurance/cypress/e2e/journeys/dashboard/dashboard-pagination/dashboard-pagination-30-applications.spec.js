import { pagination } from '../../../../../../partials';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 2;
const totalPages = totalApplications / MAX_APPLICATIONS_PER_PAGE;

context(`Insurance - Dashboard - pagination - ${totalApplications} applications`, () => {
  let applications;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

      cy.navigateToDashboardUrl();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplications(applications);
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToDashboardUrl();
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
      cy.navigateToDashboardUrl();

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
  });

  describe('when clicking on page 2 pagination link', () => {
    it('should have the correct pagination state', () => {
      cy.navigateToDashboardUrl();

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

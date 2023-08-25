import pagination from '../../../../../../partials/pagination';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 5;
const totalPages = totalApplications / MAX_APPLICATIONS_PER_PAGE;

const dashboardUrl = `${baseUrl}${DASHBOARD}`;

const assertFullyPopulatedPageLinks = () => {
  pagination.listItems().should('have.length', 5);

  cy.assertPaginationItemLink({ index: 1, pageNumber: 1 });
  cy.assertPaginationItemLink({ index: 2, pageNumber: 2 });
  cy.assertPaginationItemLink({ index: 3, pageNumber: 3 });
  cy.assertPaginationItemLink({ index: 4, pageNumber: 4 });
  cy.assertPaginationItemLink({ index: 5, pageNumber: 5 });
};

context(`Insurance - Dashboard - pagination - ${totalApplications} applications`, () => {
  let applications;

  before(() => {
    cy.completeSignInAndGoToDashboard().then(({ accountId }) => {
      cy.createApplications(accountId, totalApplications).then((createdApplications) => {
        applications = createdApplications;
      });

      cy.navigateToUrl(dashboardUrl);
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
      cy.navigateToUrl(dashboardUrl);
    });

    it('should render 4 pagination list items - 3 links, 1 ellipsis item', () => {
      pagination.listItems().should('have.length', 4);

      cy.assertPaginationItemLink({ index: 0 });
      cy.assertPaginationItemLink({ index: 1 });
      cy.assertPaginationItemEllipsis({ index: 2 });
      cy.assertPaginationItemLink({ index: 2, pageNumber: 5 });
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

  describe('when clicking on page 5 pagination link', () => {
    it('should have the correct pagination state with 1 ellipsis item', () => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(2).click();

      cy.assertPaginationState({
        totalPages,
        index: 3,
        expectedPageNumber: 5,
        nextLinkShouldExist: false,
      });

      cy.assertPaginationItemEllipsis({ index: 1 });
    });
  });

  describe('when clicking on the `previous` pagination link after clicking on page 5 pagination link', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(2).click();
      pagination.previousLink().click();
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        expectedPageNumber: 4,
      });
    });

    it('should render all 5 pagination list items', () => {
      assertFullyPopulatedPageLinks();
    });
  });

  describe('when clicking on page 2 pagination link', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(1).click();
    });

    it('should render all 5 pagination list items', () => {
      assertFullyPopulatedPageLinks();
    });
  });
});

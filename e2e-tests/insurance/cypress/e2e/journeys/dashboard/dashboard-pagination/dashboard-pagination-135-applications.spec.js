import { pagination } from '../../../../../../partials';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 9;
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

    it('should render 4 pagination list items - 3 links, 1 ellipsis item', () => {
      cy.assertLength(pagination.listItems(), 4);

      cy.assertPaginationItemLink({ index: 0 });
      cy.assertPaginationItemLink({ index: 1 });
      cy.assertPaginationItemEllipsis({ index: 2 });
      cy.assertPaginationItemLink({ index: 2, pageNumber: 9 });
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

  describe('when clicking on the `next` link 3 times to get to page 4', () => {
    beforeEach(() => {
      cy.navigateToDashboardUrl();

      pagination.nextLink().click();
      pagination.nextLink().click();
      pagination.nextLink().click();
    });

    it('should render 7 pagination list items - 6 links, 1 ellipsis item', () => {
      cy.assertLength(pagination.listItems(), 7);

      cy.assertPaginationItemLink({ index: 1, pageNumber: 1 });
      cy.assertPaginationItemLink({ index: 2, pageNumber: 2 });
      cy.assertPaginationItemLink({ index: 3, pageNumber: 3 });
      cy.assertPaginationItemLink({ index: 4, pageNumber: 4 });

      cy.assertPaginationItemEllipsis({ index: 5 });
      cy.assertPaginationItemLink({ index: 6, pageNumber: 9 });
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        index: 4,
        expectedPageNumber: 4,
      });
    });
  });

  describe('when clicking on the `next` link 4 times to get to page 5', () => {
    beforeEach(() => {
      cy.navigateToDashboardUrl();

      pagination.nextLink().click();
      pagination.nextLink().click();
      pagination.nextLink().click();
      pagination.nextLink().click();
    });

    it('should render 7 pagination list items - 5 links, 2 ellipsis items', () => {
      cy.assertLength(pagination.listItems(), 7);

      cy.assertPaginationItemLink({ index: 1, pageNumber: 1 });
      cy.assertPaginationItemEllipsis({ index: 1 });

      cy.assertPaginationItemLink({ index: 2, pageNumber: 4 });
      cy.assertPaginationItemLink({ index: 3, pageNumber: 5 });
      cy.assertPaginationItemLink({ index: 4, pageNumber: 6 });

      cy.assertPaginationItemEllipsis({ index: 5 });
      cy.assertPaginationItemLink({ index: 5, pageNumber: 9 });
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        index: 3,
        expectedPageNumber: 5,
      });
    });
  });

  describe('when clicking on the `next` link 5 times to get to page 6', () => {
    beforeEach(() => {
      cy.navigateToDashboardUrl();

      pagination.nextLink().click();
      pagination.nextLink().click();
      pagination.nextLink().click();
      pagination.nextLink().click();
      pagination.nextLink().click();
    });

    it('should render 7 pagination list items - 6 links, 1 ellipsis items', () => {
      cy.assertLength(pagination.listItems(), 7);

      cy.assertPaginationItemLink({ index: 1, pageNumber: 1 });
      cy.assertPaginationItemEllipsis({ index: 1 });

      cy.assertPaginationItemLink({ index: 2, pageNumber: 5 });
      cy.assertPaginationItemLink({ index: 3, pageNumber: 6 });
      cy.assertPaginationItemLink({ index: 4, pageNumber: 7 });
      cy.assertPaginationItemLink({ index: 5, pageNumber: 8 });
      cy.assertPaginationItemLink({ index: 6, pageNumber: 9 });
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        index: 3,
        expectedPageNumber: 6,
      });
    });
  });
});

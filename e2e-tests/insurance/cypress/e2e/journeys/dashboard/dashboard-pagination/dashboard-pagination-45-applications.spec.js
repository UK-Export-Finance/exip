import header from '../../../../../../partials/header';
import pagination from '../../../../../../partials/pagination';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 3;
const totalPages = totalApplications / MAX_APPLICATIONS_PER_PAGE;

context(`Insurance - Dashboard - pagination - ${totalApplications} applications`, () => {
  let referenceNumber;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ refNumber, accountId }) => {
      referenceNumber = refNumber;

      cy.createApplications(accountId, totalApplications);

      header.navigation.applications().click();

      cy.assertUrl(dashboardUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    // TODO delete applications
    cy.deleteApplication(referenceNumber);
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);
    });

    it('should render 3 pagination list items with links', () => {
      pagination.listItems().should('have.length', 3);

      cy.assertPaginationItemLink({ index: 0 });
      cy.assertPaginationItemLink({ index: 1 });
      cy.assertPaginationItemLink({ index: 2 });
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
        expectedPageNumber: 2,
      });
    });
  });

  describe('when clicking on the `previous` pagination link', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      // go to the next page so that the previous link exists
      pagination.nextLink().click();

      // click the previous page link
      pagination.previousLink().click();
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        index: 0,
        expectedPageNumber: 1,
        previousLinkShouldExist: false,
      });
    });
  });

  describe('when clicking on page 2 pagination link', () => {
    it('should have the correct pagination state', () => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(1).click();

      cy.assertPaginationState({
        totalPages,
        expectedPageNumber: 2,
      });
    });
  });

  describe('when clicking on page 3 pagination link', () => {
    it('should have the correct pagination state', () => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(2).click();

      cy.assertPaginationState({
        totalPages,
        expectedPageNumber: 3,
        nextLinkShouldExist: false,
      });
    });
  });
});

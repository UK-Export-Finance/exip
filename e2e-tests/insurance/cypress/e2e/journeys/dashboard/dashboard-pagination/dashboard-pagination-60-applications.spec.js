import header from '../../../../../../partials/header';
import pagination from '../../../../../../partials/pagination';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 4;
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
      pagination.listItems().should('have.length', 4);

      cy.assertPaginationItemLink({ index: 0 });
      cy.assertPaginationItemLink({ index: 1 });
      cy.assertPaginationItemLink({ index: 2 });
      cy.assertPaginationItemLink({ index: 3 });
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

  describe('when clicking on page 4 pagination link', () => {
    it('should have the correct pagination state', () => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(3).click();

      cy.assertPaginationState({
        totalPages,
        expectedPageNumber: 4,
        nextLinkShouldExist: false,
      });
    });
  });

  describe('when clicking on the `previous` pagination link after clicking on page 4 pagination link', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(3).click();
      pagination.previousLink().click();
    });

    it('should have the correct pagination state', () => {
      cy.assertPaginationState({
        totalPages,
        expectedPageNumber: 3,
      });
    });
  });
});

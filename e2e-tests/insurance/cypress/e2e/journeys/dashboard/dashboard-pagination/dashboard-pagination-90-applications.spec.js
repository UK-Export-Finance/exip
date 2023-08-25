import header from '../../../../../../partials/header';
import pagination from '../../../../../../partials/pagination';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 6;
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

    it('should render 4 pagination list items - 3 links, 1 ellipsis item', () => {
      pagination.listItems().should('have.length', 4);

      cy.assertPaginationItemLink({ index: 0 });
      cy.assertPaginationItemLink({ index: 1 });
      cy.assertPaginationItemEllipsis({ index: 2 });
      cy.assertPaginationItemLink({ index: 2, pageNumber: 6 });
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

  describe('when clicking on page 6 pagination link and then clicking on page 5 pagination link', () => {
    it('should have the correct pagination state with 1 ellipsis item', () => {
      cy.navigateToUrl(dashboardUrl);

      // click page 6 link
      pagination.listItemLink(2).click();

      // click page 5 link
      pagination.listItemLink(2).click();

      cy.assertPaginationState({
        totalPages,
        index: 3,
        expectedPageNumber: 5,
      });

      cy.assertPaginationItemEllipsis({ index: 1 });
    });
  });
});

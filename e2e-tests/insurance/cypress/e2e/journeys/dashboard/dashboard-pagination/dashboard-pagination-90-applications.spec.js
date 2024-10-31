import { pagination } from '../../../../../../partials';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { DASHBOARD } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 6;
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
      cy.navigateToDashboardUrl();

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

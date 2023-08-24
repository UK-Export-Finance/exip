import header from '../../../../../../partials/header';
import pagination from '../../../../../../partials/pagination';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { BUTTONS } from '../../../../../../content-strings';

const { DASHBOARD, DASHBOARD_PAGE } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const totalApplications = MAX_APPLICATIONS_PER_PAGE * 2;

context(`Insurance - Dashboard - pagination - ${totalApplications} items`, () => {
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

    it('should NOT render a `previous` pagination link', () => {
      pagination.previousLink().should('not.exist');
    });

    it('should render a `next` pagination link', () => {
      cy.assertPaginationNextLink(2);
    });
  });

  describe('when clicking on the `next` pagination link', () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      pagination.nextLink().click();
    });

    it(`should redirect to ${DASHBOARD_PAGE}/2`, () => {
      const expectedUrl = `${baseUrl}${DASHBOARD_PAGE}/2`;

      cy.assertUrl(expectedUrl);
    });

    it('should render a `next` pagination link', () => {
      cy.assertPaginationNextLink(3);
    });

    it('should render a `previous` pagination link', () => {
      cy.assertPaginationPreviousLink(1);
    });

    it(`should redirect to ${DASHBOARD_PAGE}/1 when clicking the 'previous' link`, () => {
      pagination.previousLink().click();

      const expectedUrl = `${baseUrl}${DASHBOARD_PAGE}/1`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe(`when clicking on the next page's pagination link`, () => {
    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);

      pagination.listItemLink(1).click();
    });

    it(`should redirect to ${DASHBOARD_PAGE}/2`, () => {
      const expectedUrl = `${baseUrl}${DASHBOARD_PAGE}/2`;

      cy.assertUrl(expectedUrl);
    });
  });
});

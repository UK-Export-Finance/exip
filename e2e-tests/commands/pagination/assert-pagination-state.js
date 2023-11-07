import assertUrl from '../shared-commands/assertions/assert-url';
import pagination from '../../partials/pagination';
import assertActivePaginationLink from './assert-active-pagination-link';
import assertPaginationNextLink from './assert-pagination-next-link';
import assertPaginationPreviousLink from './assert-pagination-previous-link';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { PAGES, ORGANISATION } from '../../content-strings';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

const {
  INSURANCE: { DASHBOARD: { PAGE_TITLE } },
} = PAGES;

const baseUrl = Cypress.config('baseUrl');
const defaultDashboardUrl = `${baseUrl}${DASHBOARD_PAGE}`;

/**
 * assertPaginationState
 * Check various aspects relating to pagination depending on the provided params.
 * 1) URL should match.
 * 2) Page title should contain "page X of Y" if the total amount of pages if greater than 1.
 * 2) Active item/link should match the provided page number.
 * 3) Next link should match the provided page number + 1.
 * 3) Previous link should match the provided page number - 1.
 * @param {String} Expected page URL
 * @param {Integer} Total number of pages
 * @param {Integer} Cypress selection index
 * @param {Integer} Expected current page number
 * @param {Boolean} Next link should exist (defaults to true)
 * @param {Boolean} Previous link should exist (defaults to true)
 */
const assertPaginationState = ({
  expectedUrl,
  totalPages,
  index,
  expectedPageNumber,
  nextLinkShouldExist = true,
  previousLinkShouldExist = true,
}) => {
  if (expectedUrl) {
    assertUrl(expectedUrl);
  } else {
    assertUrl(`${defaultDashboardUrl}/${expectedPageNumber}`);
  }

  if (totalPages > 1) {
    const expectedTitle = `${PAGE_TITLE} (Page ${expectedPageNumber} of ${totalPages}) - ${ORGANISATION}`;

    cy.title().should('eq', expectedTitle);
  } else {
    const expectedTitle = `${PAGE_TITLE} - ${ORGANISATION}`;

    cy.title().should('eq', expectedTitle);
  }

  const linkIndex = index || index === 0 ? index : expectedPageNumber;

  assertActivePaginationLink({
    index: linkIndex,
    pageNumber: expectedPageNumber,
    totalPages,
  });

  if (nextLinkShouldExist) {
    const nextPageNumber = expectedPageNumber + 1;

    assertPaginationNextLink(nextPageNumber);
  } else {
    pagination.nextLink().should('not.exist');
  }

  if (previousLinkShouldExist) {
    const previousPageNumber = expectedPageNumber - 1;
    assertPaginationPreviousLink(previousPageNumber);
  } else {
    pagination.previousLink().should('not.exist');
  }
};

export default assertPaginationState;

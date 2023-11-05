import checkLink from '../shared-commands/assertions/check-link';
import pagination from '../../partials/pagination';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

/**
 * assertPaginationItemLink
 * Check a pagination item link's href and text.
 * @param {Integer} Pagination item index
 * @param {Integer} Expected page number - defaults to index + 1 if not provided.
 */
const assertPaginationItemLink = ({ index, pageNumber }) => {
  let expectedPageNumber = pageNumber;

  if (!pageNumber) {
    expectedPageNumber = index + 1;
  }

  checkLink(
    pagination.listItemLink(index),
    `${DASHBOARD_PAGE}/${expectedPageNumber}`,
    String(expectedPageNumber),
  );
};

export default assertPaginationItemLink;

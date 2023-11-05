import checkLink from '../shared-commands/assertions/check-link';
import pagination from '../../partials/pagination';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { BUTTONS } from '../../content-strings';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

/**
 * assertPaginationNextLink
 * Check the pagination "next" link
 * @param {Integer} Expected page number
 */
const assertPaginationNextLink = (pageNumber) => {
  checkLink(
    pagination.nextLink(),
    `${DASHBOARD_PAGE}/${pageNumber}`,
    BUTTONS.NEXT,
  );
};

export default assertPaginationNextLink;

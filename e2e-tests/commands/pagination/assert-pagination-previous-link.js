import checkLink from '../shared-commands/assertions/check-link';
import pagination from '../../partials/pagination';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { BUTTONS } from '../../content-strings';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

/**
 * assertPaginationPreviousLink
 * Check the pagination "previous" link
 * @param {Integer} Expected page number
 */
const assertPaginationPreviousLink = (pageNumber) => {
  checkLink(
    pagination.previousLink(),
    `${DASHBOARD_PAGE}/${pageNumber}`,
    BUTTONS.PREVIOUS,
  );
};

export default assertPaginationPreviousLink;

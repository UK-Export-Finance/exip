import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PaginationItem } from '../../../../../types';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

/**
 * generatePaginationItem
 * Generate an object for GOV pagination component
 * If an ellipsis flag is passed, no number/current/href properties need to be returned.
 * @param {Number} Page number
 * @param {Boolean} Page is the current page
 * @param {Boolean} Item is an ellipsis
 * @returns {Object} Pagination items
 */
const generatePaginationItem = ({ number, current = false, ellipsis }: PaginationItem): PaginationItem => {
  if (ellipsis) {
    return { ellipsis: true };
  }

  return {
    number,
    current,
    href: `${DASHBOARD_PAGE}/${number}`,
  };
};

export default generatePaginationItem;

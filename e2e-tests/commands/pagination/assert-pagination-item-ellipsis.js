import checkText from '../shared-commands/assertions/check-text';
import pagination from '../../partials/pagination';

/**
 * assertPaginationItemEllipsis
 * Check a pagination item's text is an ellipsis
 * @param {Integer} Pagination item index
 */
const assertPaginationItemEllipsis = ({ index }) => {
  checkText(
    pagination.listItem(index),
    '…',
  );
};

export default assertPaginationItemEllipsis;

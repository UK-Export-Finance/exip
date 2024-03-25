import pagination from '../../partials/pagination';

/**
 * assertPaginationDoesNotExist
 * Check that there are no pagination elements visible.
 */
const assertPaginationDoesNotExist = () => {
  pagination.listItems().should('not.exist');
  pagination.previousLink().should('not.exist');
  pagination.nextLink().should('not.exist');
};

export default assertPaginationDoesNotExist;

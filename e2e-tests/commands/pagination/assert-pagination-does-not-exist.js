import pagination from '../../partials/pagination';

/**
 * assertPaginationDoesNotExist
 * Check that there are no pagination elements visible.
 */
const assertPaginationDoesNotExist = () => {
  pagination.listItems().should('have.length', 0);
  pagination.previousLink().should('not.exist');
  pagination.nextLink().should('not.exist');
};

export default assertPaginationDoesNotExist;

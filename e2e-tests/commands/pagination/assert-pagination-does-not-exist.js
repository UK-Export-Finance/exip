import pagination from '../../partials/pagination';

/**
 * assertPaginationDoesNotExist
 * Check that there are no pagination elements visible.
 */
const assertPaginationDoesNotExist = () => {
  cy.assertLength(pagination.listItems(), 0);
  pagination.previousLink().should('not.exist');
  pagination.nextLink().should('not.exist');
};

export default assertPaginationDoesNotExist;

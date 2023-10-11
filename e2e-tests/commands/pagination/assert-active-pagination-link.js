import pagination from '../../partials/pagination';
import checkAriaLabel from '../shared-commands/assertions/check-aria-label';

/**
 * assertActivePaginationLink
 * Check that a pagination link is active
 * @param {Integer} Index
 * @param {Integer} Expected page number
 * @param {Integer} Total pages
 */
const assertActivePaginationLink = ({ index, pageNumber, totalPages }) => {
  const link = pagination.listItemLink(index);

  const expectedLabel = `Current page (Page ${pageNumber} of ${totalPages})`;

  checkAriaLabel(
    link,
    expectedLabel,
  );
};

export default assertActivePaginationLink;

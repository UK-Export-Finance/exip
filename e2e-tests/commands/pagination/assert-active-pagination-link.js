import { pagination } from '../../partials';
import checkAriaLabel from '../shared-commands/assertions/check-aria-label';

/**
 * assertActivePaginationLink
 * Check that a pagination link is active
 * @param {number} Index
 * @param {number} Expected page number
 * @param {number} Total pages
 */
const assertActivePaginationLink = ({ index, pageNumber, totalPages }) => {
  const link = pagination.listItemLink(index);

  const expectedLabel = `Current page (Page ${pageNumber} of ${totalPages})`;

  checkAriaLabel(link, expectedLabel);
};

export default assertActivePaginationLink;

import generateArrayOfNumbers from '../../../generate-array-of-numbers';
import generatePaginationItem from '../generate-pagination-item';
import { PaginationItem } from '../../../../../types';

/**
 * generateNextPaginationRange
 * Generate a range of pagination items that are after the current page.
 * Currently, we only display one page after the current page.
 * This could be changed to display e.g 10 additional pages/items.
 * For example, if the current page is 4, the items will be:
 * "1, '...', 3, 4, 5, '...', 200".
 * "5" is the next range.
 * @param {Number} Total number of pages
 * @param {Number} Current page number
 * @param {Number} Next page number
 * @returns {Array} Array of pagination items
 */
const generateNextPaginationRange = (totalPages: number, currentPageNumber: number, nextPage: number): Array<PaginationItem> => {
  if (totalPages > currentPageNumber) {
    let PAGE_LINKS_TO_CREATE = 1;

    /**
     * If the current page is the first page,
     * we want to display "1, 2, 3", not "1, 2"
     */
    if (currentPageNumber === 1) {
      PAGE_LINKS_TO_CREATE = 2;
    }

    const range = generateArrayOfNumbers(nextPage, nextPage + PAGE_LINKS_TO_CREATE);

    const paginationItems = range.map((number) => generatePaginationItem({ number }));

    return paginationItems;
  }

  return [];
};

export default generateNextPaginationRange;

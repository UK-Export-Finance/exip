import generatePaginationItem from './generate-pagination-item';
import generateNextPaginationRange from './generate-next-pagination-range';
import { PaginationItem } from '../../../../types';

/**
 * MINIMUM_PAGES
 * No need for pagination if there's only 1 page.
 */
export const MINIMUM_PAGES = 2;

export const ELLIPSIS_ITEM = generatePaginationItem({ ellipsis: true });

/**
 * generatePaginationItems
 * Generate an array of objects for GOV pagination component
 * @param {Number} Current page number
 * @param {Number} Total number of pages
 * @param {Number} Previous page number
 * @param {Number} Next page numebr
 * @param {Number} Last page number
 * @returns {Array} Array of pagination items
 */
export const generatePaginationItems = (currentPageNumber: number, totalPages: number, previousPage: number, nextPage: number, lastPage: number) => {
  const nextPageIsLastPage = nextPage !== lastPage;
  const isLastPage = currentPageNumber === lastPage;

  if (totalPages >= MINIMUM_PAGES) {
    /**
     * Initial pagination items.
     * The current page is always required.
     */
    let paginationItems = [generatePaginationItem({ number: currentPageNumber, current: true })] as Array<PaginationItem>;

    if (previousPage > 0) {
      /**
       * Previous page exists.
       * Therefore, add to the beginning of the items.
       */
      const item = generatePaginationItem({ number: previousPage });

      paginationItems = [item, ...paginationItems];
    }

    if (previousPage === 2) {
      /**
       * Previous page is the second page and the current page is 3.
       * Therefore, add page number 1 to the beginning of the items.
       */
      const item = generatePaginationItem({ number: 1 });

      paginationItems = [item, ...paginationItems];
    }

    if (previousPage > 2) {
      /**
       * Previous page is the third page or greater. Therefore:
       * 1) Add page number 1 to the beginning of the items.
       * 2) Add an ellipsis item/"break" before the rest of the items.
       */
      const firstPageItem = generatePaginationItem({ number: 1 });

      paginationItems = [firstPageItem, ELLIPSIS_ITEM, ...paginationItems];
    }

    /**
     * There are more pages available and the next page is not the last page.
     * Generate a range of pages after the current page.
     * E.g, if 4 is the current page, the items will be:
     * "1, '...', 3, 4, 5, '...', 200".
     */
    if (totalPages > MINIMUM_PAGES && nextPageIsLastPage) {
      const nextSetOfPages = generateNextPaginationRange(totalPages, currentPageNumber, nextPage);

      paginationItems = [...paginationItems, ...nextSetOfPages];
    }

    if (totalPages > nextPage) {
      /**
       * The total amount of pages is greater than the next page number.
       * Therefore, add an ellipsis item to indicate there are more pages between the current set of pages and the last page.
       */
      paginationItems = [...paginationItems, ELLIPSIS_ITEM];
    }

    /**
     * A next page is avaiable.
     * Add a final item for the last page number.
     */
    if (nextPage && !isLastPage) {
      const lastPageItem = generatePaginationItem({ number: lastPage });

      paginationItems = [...paginationItems, lastPageItem];
    }

    return paginationItems;
  }

  return [];
};

export default generatePaginationItems;

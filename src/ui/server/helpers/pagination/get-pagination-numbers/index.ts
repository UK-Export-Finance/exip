import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

/**
 * getPaginationNumbers
 * Get page numbers required for pagination
 * @param {Number} Current page number
 * @returns {Object} Current, previous, next, last and total pages.
 */
export const getPaginationNumbers = (currentPage: number, totalApplications: number) => {
  let totalPages = 1;

  /**
   * Get the total amount of pages.
   * 1 page should have a maximum of MAX_APPLICATIONS_PER_PAGE
   * Therefore, divide and round the total applications/ pages
   */
  if (totalApplications > MAX_APPLICATIONS_PER_PAGE) {
    totalPages = Math.round(totalApplications / MAX_APPLICATIONS_PER_PAGE);
  }

  /**
   * Create some page numbers we need for mapping.
   * Next, previous, last page.
   */
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = totalPages;

  return {
    currentPage,
    previousPage,
    nextPage,
    lastPage,
    totalPages,
  };
};

export default getPaginationNumbers;

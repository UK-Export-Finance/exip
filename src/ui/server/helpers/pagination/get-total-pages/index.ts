import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

/**
 * getTotalPages
 * Get the total amount of pages for pagination.
 * 1 page should have a maximum of MAX_APPLICATIONS_PER_PAGE
 * Therefore, divide and round the total of applications/pages
 * @param {Number} Total amount of applications
 * @returns {Number}
 */
export const getTotalPages = (totalApplications: number) => {
  let totalPages = 1;

  if (totalApplications > MAX_APPLICATIONS_PER_PAGE) {
    totalPages = Math.round(totalApplications / MAX_APPLICATIONS_PER_PAGE);
  }

  return totalPages;
};

export default getTotalPages;

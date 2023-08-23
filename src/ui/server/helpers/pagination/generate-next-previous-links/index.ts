import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

/**
 * generateNextPreviousLinks
 * Generate "next" and previous" objects/links for GOV pagination component
 * @param {Number} Total number of pages
 * @param {Number} Current page number
 * @returns {Object}
 */
export const generateNextPreviousLinks = (totalPages: number, currentPageNumber: number) => {
  let previous = {};
  let next = {};

  if (currentPageNumber > 1) {
    const previousPage = currentPageNumber - 1;

    previous = {
      href: `${DASHBOARD_PAGE}/${previousPage}`,
    };
  }

  const isLastPage = currentPageNumber === totalPages;

  if (totalPages > 1 && !isLastPage) {
    const nextPage = currentPageNumber + 1;

    next = {
      href: `${DASHBOARD_PAGE}/${nextPage}`,
    };
  }

  return { previous, next };
};

export default generateNextPreviousLinks;

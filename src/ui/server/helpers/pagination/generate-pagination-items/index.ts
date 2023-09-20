import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

/**
 * generatePaginationItems
 * Generate an array of objects for GOV pagination component
 * @param {Number} Total amount of pages to create
 * @returns {Array} Array of pagination items/pages
 */
export const generatePaginationItems = (pagesToCreate: number) => {
  if (pagesToCreate > 1) {
    /**
     * Generate an array of all pages
     * with a URL for each page
     */
    const paginationItems = [...Array(pagesToCreate)].map((x, index) => {
      const pageNumber = index + 1;

      return { url: `${DASHBOARD_PAGE}/${pageNumber}` };
    });

    return paginationItems;
  }

  return [];
};

export default generatePaginationItems;

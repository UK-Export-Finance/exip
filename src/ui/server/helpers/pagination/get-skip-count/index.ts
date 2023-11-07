import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

/**
 * getSkipCount
 * If the current page number is above 1,
 * calculate the amount of applications to skip.
 * This is used in the GraphQL API call for pagination.
 * @param {Number} Current page number
 * @returns {Number}
 */
export const getSkipCount = (currentPageNumber: number) => {
  if (currentPageNumber > 1) {
    const multiplySkipBy = currentPageNumber - 1;

    const skip = MAX_APPLICATIONS_PER_PAGE * multiplySkipBy;

    return skip;
  }

  return 0;
};

export default getSkipCount;

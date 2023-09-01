import generatePaginationItems from '.';
import getTotalPages from '../get-total-pages';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

let mockTotalApplications = 100;

describe('server/helpers/pagination/generate-pagination-items', () => {
  it('should return an array of pagination items', () => {
    const result = generatePaginationItems(mockTotalApplications);

    const pagesToCreate = getTotalPages(mockTotalApplications);

    const expected = [...Array(pagesToCreate)].map((x, index) => {
      const pageNumber = index + 1;

      return { url: `${DASHBOARD_PAGE}/${pageNumber}` };
    });

    expect(result).toEqual(expected);
  });

  describe('when pagesToCreate is not greater than 1', () => {
    it('should return an empty array', () => {
      mockTotalApplications = MAX_APPLICATIONS_PER_PAGE;

      const result = generatePaginationItems(mockTotalApplications);

      expect(result).toEqual([]);
    });
  });
});

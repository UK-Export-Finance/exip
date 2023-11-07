import generatePaginationItems from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

let mockPagesToCreate = 100;

describe('server/helpers/pagination/generate-pagination-items', () => {
  it('should return an array of pagination items', () => {
    const result = generatePaginationItems(mockPagesToCreate);

    const expected = [...Array(mockPagesToCreate)].map((x, index) => {
      const pageNumber = index + 1;

      return { url: `${DASHBOARD_PAGE}/${pageNumber}` };
    });

    expect(result).toEqual(expected);
  });

  describe('when pagesToCreate is NOT greater than 1', () => {
    it('should return an empty array', () => {
      mockPagesToCreate = 0;

      const result = generatePaginationItems(mockPagesToCreate);

      expect(result).toEqual([]);
    });
  });
});

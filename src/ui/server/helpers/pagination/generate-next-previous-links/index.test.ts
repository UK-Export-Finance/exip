import generateNextPreviousLinks from '.';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { DASHBOARD_PAGE } = INSURANCE_ROUTES;

let mockTotalPages = 10;
let mockCurrentPageNumber = 3;

describe('server/helpers/pagination/generate-next-previous-links', () => {
  describe('when currentPageNumber is greater than 1', () => {
    it('should return a "previous" object/href', () => {
      const result = generateNextPreviousLinks(mockTotalPages, mockCurrentPageNumber);

      const expectedPreviousPage = mockCurrentPageNumber - 1;

      const expected = {
        href: `${DASHBOARD_PAGE}/${expectedPreviousPage}`,
      };

      expect(result.previous).toEqual(expected);
    });
  });

  describe('when currentPageNumber is NOT greater than 1', () => {
    it('should return an empty object', () => {
      mockCurrentPageNumber = 1;

      const result = generateNextPreviousLinks(mockTotalPages, mockCurrentPageNumber);

      expect(result.previous).toEqual({});
    });
  });

  describe('when totalPages is greater than 1 and the the current page number is NOT the last page', () => {
    it('should return a "next object/href', () => {
      const result = generateNextPreviousLinks(mockTotalPages, mockCurrentPageNumber);

      const expectedNextPage = mockCurrentPageNumber + 1;

      const expected = {
        href: `${DASHBOARD_PAGE}/${expectedNextPage}`,
      };

      expect(result.next).toEqual(expected);
    });
  });

  describe('when totalPages is NOT greater than 1', () => {
    it('should return an empty object', () => {
      mockTotalPages = 1;

      const result = generateNextPreviousLinks(mockTotalPages, mockCurrentPageNumber);

      expect(result.next).toEqual({});
    });
  });

  describe('when currentPageNumber equals totalPages (and is therefore the last page)', () => {
    it('should return an empty object', () => {
      mockTotalPages = 5;
      mockCurrentPageNumber = 5;

      const result = generateNextPreviousLinks(mockTotalPages, mockCurrentPageNumber);

      expect(result.next).toEqual({});
    });
  });
});

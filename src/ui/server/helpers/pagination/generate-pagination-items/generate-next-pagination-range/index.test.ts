import generateNextPaginationRange from '.';
import generateArrayOfNumbers from '../../../generate-array-of-numbers';
import generatePaginationItem from '../generate-pagination-item';

let mockTotalPages = 10;
let mockCurrentPageNumber = 3;
const mockNextPage = 4;

describe('server/helpers/pagination/generate-pagination-items/generate-next-pagination-range', () => {
  describe('when totalPages is greater than currentPageNumber', () => {
    it('should return a single item via generateArrayOfNumbers', () => {
      const result = generateNextPaginationRange(mockTotalPages, mockCurrentPageNumber, mockNextPage);

      const expectedLinksToCreate = 1;

      const range = generateArrayOfNumbers(mockNextPage, mockNextPage + expectedLinksToCreate);

      const expected = range.map((number) => generatePaginationItem({ number }));

      expect(result).toEqual(expected);
    });

    describe('when the currentPageNumber is exactly 1', () => {
      it('should return a range of numbers, creating', () => {
        mockCurrentPageNumber = 1;

        const result = generateNextPaginationRange(mockTotalPages, mockCurrentPageNumber, mockNextPage);

        const expectedLinksToCreate = 2;

        const range = generateArrayOfNumbers(mockNextPage, mockNextPage + expectedLinksToCreate);

        const expected = range.map((number) => generatePaginationItem({ number }));

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when totalPages is not greater than currentPageNumber', () => {
    it('should return a an empty array', () => {
      mockTotalPages = 1;

      const result = generateNextPaginationRange(mockTotalPages, mockCurrentPageNumber, mockNextPage);

      expect(result).toEqual([]);
    });
  });
});

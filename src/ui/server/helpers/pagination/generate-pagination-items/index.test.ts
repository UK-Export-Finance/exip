import generatePaginationItems, { MINIMUM_PAGES, ELLIPSIS_ITEM } from '.';
import generatePaginationItem from './generate-pagination-item';
import generateNextPaginationRange from './generate-next-pagination-range';

let mockCurrentPageNumber = 10;
let mockTotalPages = MINIMUM_PAGES + 10;
let mockPreviousPage = 9;
let mockNextPage = 11;
const mockLastPage = 20;

describe('server/helpers/pagination/generate-pagination-items', () => {
  describe('MINIMUM_PAGES', () => {
    it('should be defined', () => {
      expect(MINIMUM_PAGES).toEqual(2);
    });
  });

  describe('ELLIPSIS_ITEM', () => {
    it('should return a pagination item', () => {
      const expected = generatePaginationItem({ ellipsis: true });

      expect(ELLIPSIS_ITEM).toEqual(expected);
    });
  });

  describe('generatePaginationItems', () => {
    describe('when totalPages is greater than MINIMUM_PAGES', () => {
      describe('when totalPages is greater than nextPage', () => {
        describe('when previousPage is greater than 2', () => {
          it('should return an array of pagination items with ellipsis after the first item', () => {
            const result = generatePaginationItems(mockCurrentPageNumber, mockTotalPages, mockPreviousPage, mockNextPage, mockLastPage);

            const expected = [
              generatePaginationItem({ number: 1 }),
              ELLIPSIS_ITEM,
              generatePaginationItem({ number: mockPreviousPage }),
              generatePaginationItem({ number: mockCurrentPageNumber, current: true }),
              ...generateNextPaginationRange(mockTotalPages, mockCurrentPageNumber, mockNextPage),
              ELLIPSIS_ITEM,
              generatePaginationItem({ number: mockLastPage }),
            ];

            expect(result).toEqual(expected);
          });
        });

        describe('when previousPage is 1', () => {
          it('should return array of pagination items', () => {
            mockPreviousPage = 1;
            mockCurrentPageNumber = 2;
            mockNextPage = 3;

            const result = generatePaginationItems(mockCurrentPageNumber, mockTotalPages, mockPreviousPage, mockNextPage, mockLastPage);

            const expected = [
              generatePaginationItem({ number: 1 }),
              generatePaginationItem({ number: mockCurrentPageNumber, current: true }),
              ...generateNextPaginationRange(mockTotalPages, mockCurrentPageNumber, mockNextPage),
              ELLIPSIS_ITEM,
              generatePaginationItem({ number: mockLastPage }),
            ];

            expect(result).toEqual(expected);
          });
        });

        describe('when previousPage is exactly 2', () => {
          it('should return array of pagination items with the first item being the first page', () => {
            mockPreviousPage = 2;
            mockCurrentPageNumber = 3;
            mockNextPage = 4;

            const result = generatePaginationItems(mockCurrentPageNumber, mockTotalPages, mockPreviousPage, mockNextPage, mockLastPage);

            const expected = [
              generatePaginationItem({ number: 1 }),
              generatePaginationItem({ number: mockPreviousPage }),
              generatePaginationItem({ number: mockCurrentPageNumber, current: true }),
              generatePaginationItem({ number: 4 }),
              ELLIPSIS_ITEM,
              generatePaginationItem({ number: mockLastPage }),
            ];

            expect(result).toEqual(expected);
          });
        });
      });

      describe('when totalPages is NOT greater than nextPage', () => {
        it('should return array of pagination items without the first item being the first page', () => {
          mockNextPage = 4;
          mockTotalPages = mockNextPage - 1;

          const result = generatePaginationItems(mockCurrentPageNumber, mockTotalPages, mockPreviousPage, mockNextPage, mockLastPage);

          const expected = [
            generatePaginationItem({ number: 1 }),
            generatePaginationItem({ number: mockPreviousPage }),
            generatePaginationItem({ number: mockCurrentPageNumber, current: true }),
            generatePaginationItem({ number: mockLastPage }),
          ];

          expect(result).toEqual(expected);
        });
      });
    });

    describe('when totalPages is equal to MINIMUM_PAGES', () => {
      it('should return array of pagination items', () => {
        mockNextPage = 4;
        mockTotalPages = MINIMUM_PAGES;

        const result = generatePaginationItems(mockCurrentPageNumber, mockTotalPages, mockPreviousPage, mockNextPage, mockLastPage);

        const expected = [
          generatePaginationItem({ number: 1 }),
          generatePaginationItem({ number: mockPreviousPage }),
          generatePaginationItem({ number: mockCurrentPageNumber, current: true }),
          generatePaginationItem({ number: mockLastPage }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when totalPages is NOT greater than MINIMUM_PAGES', () => {
      it('should return an empty array', () => {
        mockTotalPages = MINIMUM_PAGES - 1;

        const result = generatePaginationItems(mockCurrentPageNumber, mockTotalPages, mockPreviousPage, mockNextPage, mockLastPage);

        expect(result).toEqual([]);
      });
    });
  });
});

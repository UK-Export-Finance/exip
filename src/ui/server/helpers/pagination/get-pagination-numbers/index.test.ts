import getPaginationNumbers from '.';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

const mockCurrentPage = 1;

describe('server/helpers/pagination/generate-pagination-numbers', () => {
  it('should return various page numbers with totalPages as 1', () => {
    const mockTotalApplications = 2;

    const result = getPaginationNumbers(mockCurrentPage, mockTotalApplications);

    const expected = {
      currentPage: mockCurrentPage,
      previousPage: mockCurrentPage - 1,
      nextPage: mockCurrentPage + 1,
      lastPage: 1,
      totalPages: 1,
    };

    expect(result).toEqual(expected);
  });

  describe('when totalApplications exceeds MAX_APPLICATIONS_PER_PAGE', () => {
    it('should return various page numbers with totalPages as 1', () => {
      const mockTotalApplications = MAX_APPLICATIONS_PER_PAGE + 10;

      const result = getPaginationNumbers(mockCurrentPage, mockTotalApplications);

      const expectedTotalPages = Math.round(mockTotalApplications / MAX_APPLICATIONS_PER_PAGE);

      const expected = {
        currentPage: mockCurrentPage,
        previousPage: mockCurrentPage - 1,
        nextPage: mockCurrentPage + 1,
        lastPage: expectedTotalPages,
        totalPages: expectedTotalPages,
      };

      expect(result).toEqual(expected);
    });
  });
});

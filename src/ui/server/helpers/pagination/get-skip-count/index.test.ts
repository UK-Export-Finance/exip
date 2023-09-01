import getSkipCount from '.';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

describe('server/helpers/pagination/get-skip-count', () => {
  describe('when the currentPageNumber is over 1', () => {
    it('should return a multiplication', () => {
      const mockCurrentPageNumber = 2;

      const result = getSkipCount(mockCurrentPageNumber);

      const multiplySkipBy = mockCurrentPageNumber - 1;

      const expected = MAX_APPLICATIONS_PER_PAGE * multiplySkipBy;

      expect(result).toEqual(expected);
    });
  });

  describe('when the currentPageNumber is 1', () => {
    it('should return 0', () => {
      const mockCurrentPageNumber = 1;

      const result = getSkipCount(mockCurrentPageNumber);

      expect(result).toEqual(0);
    });
  });

  describe('when the currentPageNumber is less than 1', () => {
    it('should return 0', () => {
      const mockCurrentPageNumber = 0;

      const result = getSkipCount(mockCurrentPageNumber);

      expect(result).toEqual(0);
    });
  });
});

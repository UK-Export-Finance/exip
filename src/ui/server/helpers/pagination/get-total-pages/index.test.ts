import getTotalPages from '.';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

describe('server/helpers/pagination/get-total-pages', () => {
  describe('when totalApplications is greater than MAX_APPLICATIONS_PER_PAGE', () => {
    it('should return rounded amount of applications divided by MAX_APPLICATIONS_PER_PAGE', () => {
      const mockTotalApplications = MAX_APPLICATIONS_PER_PAGE + 1;
      const result = getTotalPages(mockTotalApplications);

      const expected = Math.ceil(mockTotalApplications / MAX_APPLICATIONS_PER_PAGE);

      expect(result).toEqual(expected);
    });
  });

  describe('when totalApplications is less than MAX_APPLICATIONS_PER_PAGE', () => {
    it('should return default 1', () => {
      const mockTotalApplications = MAX_APPLICATIONS_PER_PAGE - 1;
      const result = getTotalPages(mockTotalApplications);

      const expected = 1;

      expect(result).toEqual(expected);
    });
  });
});

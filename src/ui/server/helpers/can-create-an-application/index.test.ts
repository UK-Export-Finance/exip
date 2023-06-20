import canCreateAnApplication from '.';
import mockEligibility from '../../test-mocks/mock-eligibility';

describe('server/helpers/can-create-an-application', () => {
  describe('when session.submittedData.insuranceEligibility has answers and session.requestedApplicationCreation is false', () => {
    it('should return true', () => {
      const mockSession = {
        submittedData: {
          insuranceEligibility: mockEligibility,
          quoteEligibility: {},
        },
      };

      const result = canCreateAnApplication(mockSession);

      expect(result).toEqual(true);
    });
  });

  describe('when session.submittedData.insuranceEligibility does NOT have answers', () => {
    it('should return false', () => {
      const mockSession = {
        submittedData: {
          insuranceEligibility: {},
          quoteEligibility: {},
        },
      };

      const result = canCreateAnApplication(mockSession);

      expect(result).toEqual(false);
    });
  });
});

import canCreateAnApplication from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import missingEligibilityFields from './log-missing-eligibility-fields';
import mockEligibility from '../../test-mocks/mock-eligibility';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/can-create-an-application', () => {
  jest.mock('./log-missing-eligibility-fields');

  let logMissingEligibilityFieldsSpy = () => null;

  beforeEach(() => {
    jest.resetAllMocks();

    logMissingEligibilityFieldsSpy = jest.fn();

    missingEligibilityFields.log = logMissingEligibilityFieldsSpy;
  });

  describe('when session.submittedData.insuranceEligibility is populated without all required answers', () => {
    const mockSession = {
      submittedData: {
        insuranceEligibility: {
          [BUYER_COUNTRY]: mockEligibility.buyerCountry,
        },
        quoteEligibility: {},
      },
    };

    it('should call missingEligibilityFieldsSpy.log', () => {
      canCreateAnApplication(mockSession);

      expect(logMissingEligibilityFieldsSpy).toHaveBeenCalledTimes(1);
    });

    it('should return false', () => {
      const result = canCreateAnApplication(mockSession);

      expect(result).toEqual(false);
    });
  });

  describe('when session.submittedData.insuranceEligibility is populated with all required answers', () => {
    const mockSession = {
      submittedData: {
        insuranceEligibility: mockEligibility,
        quoteEligibility: {},
      },
    };

    it('should call missingEligibilityFieldsSpy.log', () => {
      canCreateAnApplication(mockSession);

      expect(logMissingEligibilityFieldsSpy).toHaveBeenCalledTimes(1);
    });

    it('should return true', () => {
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

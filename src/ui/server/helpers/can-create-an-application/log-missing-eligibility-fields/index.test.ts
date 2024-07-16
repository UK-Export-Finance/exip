import missingEligibilityFields, { CORE_LOG_MESSAGE } from '.';

const baseParams = {
  hasBuyerCountry: true,
  hasCompanyNumber: true,
  hasCoverPeriod: true,
  hasCompaniesHouseNumber: true,
  hasEndBuyer: false,
  hasMinimumUkGoodsOrServices: true,
  hasReviewedEligibility: true,
  hasTotalContractValue: true,
};

describe('server/helpers/can-create-an-application/log-missing-eligibility-fields', () => {
  let consoleSpy = () => null;

  beforeEach(() => {
    consoleSpy = jest.fn();

    console.error = consoleSpy;
  });

  describe('when hasBuyerCountry is false', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasBuyerCountry: false });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`${CORE_LOG_MESSAGE} 'has buyer country' flag`);
    });
  });

  describe('when hasCompanyNumber is false', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasCompanyNumber: false });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`${CORE_LOG_MESSAGE} 'has company number' flag`);
    });
  });

  describe('when hasCoverPeriod is false', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasCoverPeriod: false });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`${CORE_LOG_MESSAGE} 'has cover period' flag`);
    });
  });

  describe('when hasEndBuyer is true', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasEndBuyer: true });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('Eligibility session data has an invalid `has end buyer` flag (should have a false boolean value)');
    });
  });

  describe('when hasMinimumUkGoodsOrServices is false', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasMinimumUkGoodsOrServices: false });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`${CORE_LOG_MESSAGE} 'has minimum UK goods or services' flag`);
    });
  });

  describe('when hasReviewedEligibility is false', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasReviewedEligibility: false });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`${CORE_LOG_MESSAGE} 'has reviewed eligibility' flag`);
    });
  });

  describe('when hasTotalContractValue is false', () => {
    it('should log an error', () => {
      missingEligibilityFields.log({ ...baseParams, hasTotalContractValue: false });

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(`${CORE_LOG_MESSAGE} 'has total contract value' flag`);
    });
  });

  // TODO: when empty object.
  // TODO: when all valid
});

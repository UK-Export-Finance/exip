import hasRequiredEligibilityFields from '.';

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

describe('server/helpers/can-create-an-application/has-required-eligibility-fields', () => {
  describe('when all expected eligibility answers are provided', () => {
    it('should return all fields as true', () => {
      const result = hasRequiredEligibilityFields(baseParams);

      expect(result).toEqual(true);
    });
  });

  describe('when hasBuyerCountry is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasBuyerCountry: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasCompanyNumber is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasCompanyNumber: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasCoverPeriod is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasCoverPeriod: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasCompaniesHouseNumber is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasCompaniesHouseNumber: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasEndBuyer is true', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasEndBuyer: true };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasMinimumUkGoodsOrServices is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasMinimumUkGoodsOrServices: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasReviewedEligibility is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasReviewedEligibility: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });

  describe('when hasTotalContractValue is false', () => {
    it('should return false', () => {
      const mockAnswers = { ...baseParams, hasTotalContractValue: false };

      const result = hasRequiredEligibilityFields(mockAnswers);

      expect(result).toEqual(false);
    });
  });
});

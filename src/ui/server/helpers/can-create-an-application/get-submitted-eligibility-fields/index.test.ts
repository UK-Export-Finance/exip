import getSubmittedEligibilityFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockEligibility, mockCountryCanApplyForInsuranceOnline } from '../../../test-mocks';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    COVER_PERIOD,
    HAS_COMPANIES_HOUSE_NUMBER,
    HAS_END_BUYER,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    HAS_REVIEWED_ELIGIBILITY,
    TOTAL_CONTRACT_VALUE,
  },
} = INSURANCE_FIELD_IDS;

const expectedSuccessObject = {
  hasBuyerCountry: true,
  hasCompanyNumber: true,
  hasCoverPeriod: true,
  hasCompaniesHouseNumber: true,
  hasEndBuyer: false,
  hasMinimumUkGoodsOrServices: true,
  hasReviewedEligibility: true,
  hasTotalContractValue: true,
};

describe('server/helpers/can-create-an-application/get-submitted-eligibility-fields', () => {
  describe('when all expected eligibility answers are provided', () => {
    it('should return all fields as true', () => {
      const result = getSubmittedEligibilityFields(mockEligibility);

      const expected = expectedSuccessObject;

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${BUYER_COUNTRY} has an empty isoCode`, () => {
    it('should return hasBuyerCountry=false', () => {
      const mockAnswers = {
        ...mockEligibility,
        [BUYER_COUNTRY]: {
          ...mockCountryCanApplyForInsuranceOnline,
          isoCode: '',
        },
      };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasBuyerCountry: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${COVER_PERIOD} is 0`, () => {
    it('should return hasCoverPeriod=false', () => {
      const mockAnswers = { ...mockEligibility, [COVER_PERIOD]: 0 };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasCoverPeriod: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${COVER_PERIOD} is undefined`, () => {
    it('should return hasCoverPeriod=false', () => {
      const mockAnswers = { ...mockEligibility, [COVER_PERIOD]: undefined };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasCoverPeriod: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${HAS_COMPANIES_HOUSE_NUMBER} is false`, () => {
    it('should return hasCompaniesHouseNumber=false', () => {
      const mockAnswers = { ...mockEligibility, [HAS_COMPANIES_HOUSE_NUMBER]: false };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasCompaniesHouseNumber: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${HAS_END_BUYER} is false`, () => {
    it('should return hasEndBuyer=false', () => {
      const mockAnswers = { ...mockEligibility, [HAS_END_BUYER]: false };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasEndBuyer: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${HAS_MINIMUM_UK_GOODS_OR_SERVICES} is false`, () => {
    it('should return hasMinimumUkGoodsOrServices=false', () => {
      const mockAnswers = { ...mockEligibility, [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: false };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasMinimumUkGoodsOrServices: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${HAS_REVIEWED_ELIGIBILITY} is false`, () => {
    it('should return hasMinimumUkGoodsOrServices=false', () => {
      const mockAnswers = { ...mockEligibility, [HAS_REVIEWED_ELIGIBILITY]: false };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasReviewedEligibility: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${TOTAL_CONTRACT_VALUE} is undefined`, () => {
    it('should return hasTotalContractValue=false', () => {
      const mockAnswers = { ...mockEligibility, [TOTAL_CONTRACT_VALUE]: undefined };

      const result = getSubmittedEligibilityFields(mockAnswers);

      const expected = { ...expectedSuccessObject, hasTotalContractValue: false };

      expect(result).toEqual(expected);
    });
  });
});

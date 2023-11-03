import mapEligibilityAnswers, { mapTotalContractValue } from '.';
import { FIELD_IDS, TOTAL_CONTRACT_VALUE } from '../../constants';
import { mockEligibility } from '../../test-mocks';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY, BUYER_COUNTRY_ISO_CODE, TOTAL_CONTRACT_VALUE_ID },
  },
} = FIELD_IDS;

describe('server/helpers/map-eligibility-answers', () => {
  describe('mapTotalContractValue', () => {
    describe('when the provided answer is a true boolean', () => {
      it(`should return "${TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID}"`, () => {
        const result = mapTotalContractValue(true);

        const expected = TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID;
        expect(result).toEqual(expected);
      });
    });

    describe('when the provided answer is a false boolean', () => {
      it(`should return "${TOTAL_CONTRACT_VALUE.MORE_THAN_500K.DB_ID}"`, () => {
        const result = mapTotalContractValue(false);

        const expected = TOTAL_CONTRACT_VALUE.MORE_THAN_500K.DB_ID;
        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapEligibilityAnswers', () => {
    describe('when a buyerCountry is provided', () => {
      it(`should return the answers with buyer country as ${BUYER_COUNTRY_ISO_CODE}`, () => {
        const mockAnswers = mockEligibility;

        const result = mapEligibilityAnswers(mockAnswers);

        const { buyerCountry, wantCoverOverMaxAmount, ...otherAnswers } = mockAnswers;

        const expected = {
          ...otherAnswers,
          [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
          [TOTAL_CONTRACT_VALUE_ID]: mapTotalContractValue(Boolean(wantCoverOverMaxAmount)),
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when a buyerCountry is NOT provided', () => {
      it('should return the answers as is', () => {
        const mockAnswers = {
          ...mockEligibility,
          [BUYER_COUNTRY]: null,
        };

        const result = mapEligibilityAnswers(mockAnswers);

        const expected = mockAnswers;

        expect(result).toEqual(expected);
      });
    });
  });
});

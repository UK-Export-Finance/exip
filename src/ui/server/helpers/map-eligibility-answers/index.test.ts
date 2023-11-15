import mapEligibilityAnswers from '.';
import { FIELD_IDS } from '../../constants';
import mapCoverPeriodId from '../map-cover-period-id';
import { mockEligibility } from '../../test-mocks';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY, BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, TOTAL_CONTRACT_VALUE_ID, HAS_END_BUYER },
  },
} = FIELD_IDS;

describe('server/helpers/map-eligibility-answers', () => {
  describe('when a buyerCountry is provided', () => {
    it(`should return the answers with buyer country as ${BUYER_COUNTRY_ISO_CODE}`, () => {
      const mockAnswers = mockEligibility;

      const result = mapEligibilityAnswers(mockAnswers);

      const { buyerCountry, wantCoverOverMaxPeriod, totalContractValue, ...otherAnswers } = mockAnswers;

      const wantCoverOverMaxPeriodBoolean = Boolean(wantCoverOverMaxPeriod);

      const expected = {
        ...otherAnswers,
        [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
        [COVER_PERIOD_ID]: mapCoverPeriodId(wantCoverOverMaxPeriodBoolean),
        [TOTAL_CONTRACT_VALUE_ID]: totalContractValue,
      };

      // TODO: EMS-2227
      // temporarily exclude HAS_END_BUYER until the DB/API has been updated.
      delete expected[HAS_END_BUYER];

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

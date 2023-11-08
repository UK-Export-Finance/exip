import mapEligibilityAnswers from '.';
import { FIELD_IDS } from '../../constants';
import mapCoverPeriodId from '../map-cover-period-id';
import { mockEligibility } from '../../test-mocks';

const {
  INSURANCE: {
    ELIGIBILITY: { BUYER_COUNTRY, BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID },
  },
} = FIELD_IDS;

describe('server/helpers/map-eligibility-answers', () => {
  describe('when a buyerCountry is provided', () => {
    it(`should return the answers with buyer country as ${BUYER_COUNTRY_ISO_CODE}`, () => {
      const mockAnswers = mockEligibility;

      const result = mapEligibilityAnswers(mockAnswers);

      const { buyerCountry, wantCoverOverMaxPeriod, totalValueInsured, ...otherAnswers } = mockAnswers;

      const wantCoverOverMaxPeriodBoolean = Boolean(wantCoverOverMaxPeriod);

      const expected = {
        ...otherAnswers,
        [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
        [COVER_PERIOD_ID]: mapCoverPeriodId(wantCoverOverMaxPeriodBoolean),
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

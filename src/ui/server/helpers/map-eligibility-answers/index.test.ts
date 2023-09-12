import mapEligibilityAnswers from '.';
import FIELD_IDS from '../../constants/field-ids/insurance';
import { mockEligibility } from '../../test-mocks';

const { BUYER_COUNTRY, BUYER_COUNTRY_ISO_CODE } = FIELD_IDS.ELIGIBILITY;

describe('server/helpers/map-eligibility-answers', () => {
  describe('when a buyerCountry is provided', () => {
    it(`should return the answers with buyer country as ${BUYER_COUNTRY_ISO_CODE}`, () => {
      const mockAnswers = mockEligibility;

      const result = mapEligibilityAnswers(mockAnswers);

      const { buyerCountry, ...otherAnswers } = mockAnswers;

      const expected = {
        ...otherAnswers,
        [BUYER_COUNTRY_ISO_CODE]: buyerCountry?.isoCode,
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

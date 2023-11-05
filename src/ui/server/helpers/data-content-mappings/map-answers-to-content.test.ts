import { mapPercentageOfCover, mapAnswersToContent } from './map-answers-to-content';
import mapCountry from './map-country';
import mapCost from './map-cost';
import mapMonthString from './map-month-string';
import mapPolicyLength from './map-policy-length';
import { FIELD_IDS } from '../../constants';
import { SUMMARY_ANSWERS } from '../../content-strings';
import { mockAnswers } from '../../test-mocks';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CREDIT_PERIOD, PERCENTAGE_OF_COVER, HAS_MINIMUM_UK_GOODS_OR_SERVICES, VALID_EXPORTER_LOCATION },
  POLICY_TYPE,
} = FIELD_IDS;

describe('server/helpers/map-answers-to-content', () => {
  describe('mapPercentageOfCover', () => {
    it('should return a string with percentage symbol', () => {
      const mockAnswer = mockAnswers[PERCENTAGE_OF_COVER];

      const result = mapPercentageOfCover(mockAnswer);

      const expected = `${mockAnswers[PERCENTAGE_OF_COVER]}%`;

      expect(result).toEqual(expected);
    });
  });

  describe('mapAnswersToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const result = mapAnswersToContent(mockAnswers);

      const expected = {
        [VALID_EXPORTER_LOCATION]: SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION],
        [BUYER_COUNTRY]: mapCountry(mockAnswers[BUYER_COUNTRY]),
        [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
        [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
        ...mapCost(mockAnswers),
        ...mapPolicyLength(mockAnswers),
        [PERCENTAGE_OF_COVER]: mapPercentageOfCover(mockAnswers[PERCENTAGE_OF_COVER]),
        [CREDIT_PERIOD]: mapMonthString(mockAnswers[CREDIT_PERIOD]),
      };

      expect(result).toEqual(expected);
    });
  });
});

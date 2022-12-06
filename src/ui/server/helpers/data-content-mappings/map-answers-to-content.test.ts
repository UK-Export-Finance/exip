import { mapPolicyType, mapPercentageOfCover, mapAnswersToContent } from './map-answers-to-content';
import mapCountry from './map-country';
import mapCost from './map-cost';
import mapPeriodMonths from './map-period-months';
import mapPolicyLength from './map-policy-length';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { SUMMARY_ANSWERS } from '../../content-strings';
import { mockAnswers } from '../../test-mocks';

const {
  BUYER_COUNTRY,
  CREDIT_PERIOD,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

describe('server/helpers/map-answers-to-content', () => {
  describe('mapPolicyType', () => {
    describe('when policy type is single', () => {
      it(`should return an object with ${SINGLE_POLICY_TYPE}`, () => {
        const mockAnswer = FIELD_VALUES.POLICY_TYPE.SINGLE;
        const result = mapPolicyType(mockAnswer);

        const expected = {
          [SINGLE_POLICY_TYPE]: {
            text: mockAnswer,
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is single', () => {
      it(`should return an object with ${MULTI_POLICY_TYPE}`, () => {
        const mockAnswer = FIELD_VALUES.POLICY_TYPE.MULTI;

        const result = mapPolicyType(mockAnswer);

        const expected = {
          [MULTI_POLICY_TYPE]: {
            text: mockAnswer,
          },
        };

        expect(result).toEqual(expected);
      });
    });
  });

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
        [VALID_COMPANY_BASE]: {
          text: SUMMARY_ANSWERS[VALID_COMPANY_BASE],
        },
        [BUYER_COUNTRY]: {
          text: mapCountry(mockAnswers[BUYER_COUNTRY]),
        },
        [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
          text: SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
        },
        ...mapCost(mockAnswers),
        ...mapPolicyType(mockAnswers[POLICY_TYPE]),
        ...mapPolicyLength(mockAnswers),
        [PERCENTAGE_OF_COVER]: {
          text: mapPercentageOfCover(mockAnswers[PERCENTAGE_OF_COVER]),
        },
        [CREDIT_PERIOD]: {
          text: mapPeriodMonths(mockAnswers[CREDIT_PERIOD]),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});

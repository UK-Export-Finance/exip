const {
  mapTriedPrivateCover,
  mapPolicyType,
  mapPercentageOfCover,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const mapCountry = require('./map-country');
const mapPeriodMonths = require('./map-period-months');
const mapPolicyLength = require('./map-policy-length');
const formatCurrency = require('../format-currency');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');
const { SUMMARY_ANSWERS } = require('../../content-strings');
const { mockAnswers } = require('../../test-mocks');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  CAN_GET_PRIVATE_INSURANCE_YES,
  CAN_GET_PRIVATE_INSURANCE_NO,
  CURRENCY,
  CREDIT_PERIOD,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

describe('server/helpers/map-answers-to-content', () => {
  describe('mapTriedPrivateCover', () => {
    describe('when answer is yes', () => {
      it(`should return an object with ${CAN_GET_PRIVATE_INSURANCE_YES} and mapped summary answer`, () => {
        const mockAnswer = FIELD_VALUES.CAN_GET_PRIVATE_INSURANCE.YES;

        const result = mapTriedPrivateCover(mockAnswer);

        const expected = {
          [CAN_GET_PRIVATE_INSURANCE_YES]: {
            text: SUMMARY_ANSWERS[CAN_GET_PRIVATE_INSURANCE_YES],
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when answer is no', () => {
      it(`should return an object with ${CAN_GET_PRIVATE_INSURANCE_NO} and mapped summary answer`, () => {
        const mockAnswer = FIELD_VALUES.CAN_GET_PRIVATE_INSURANCE.NO;

        const result = mapTriedPrivateCover(mockAnswer);

        const expected = {
          [CAN_GET_PRIVATE_INSURANCE_NO]: {
            text: SUMMARY_ANSWERS[CAN_GET_PRIVATE_INSURANCE_NO],
          },
        };

        expect(result).toEqual(expected);
      });
    });
  });

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
        ...mapTriedPrivateCover(mockAnswers[CAN_GET_PRIVATE_INSURANCE]),
        [UK_GOODS_OR_SERVICES]: {
          text: SUMMARY_ANSWERS[UK_GOODS_OR_SERVICES],
        },
        [AMOUNT]: {
          text: formatCurrency(mockAnswers[AMOUNT], mockAnswers[CURRENCY].isoCode),
        },
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

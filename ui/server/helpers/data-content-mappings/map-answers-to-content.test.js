const {
  mapPolicyType,
  mapTriedPrivateCover,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const mapCountry = require('./map-country');
const mapPeriodDays = require('./map-period-days');
const mapPolicyLength = require('./map-policy-length');
const formatCurrency = require('../format-currency');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');
const { SUMMARY_ANSWERS } = require('../../content-strings');
const { mockAnswers } = require('../../test-mocks');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE,
  CAN_GET_PRIVATE_INSURANCE_YES,
  CAN_GET_PRIVATE_INSURANCE_NO,
  UK_GOODS_OR_SERVICES,
  AMOUNT,
  CURRENCY,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
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
        [CREDIT_PERIOD]: {
          text: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});

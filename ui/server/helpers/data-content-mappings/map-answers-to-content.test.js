const {
  mapCurrency,
  mapPolicyType,
  mapTriedPrivateCover,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const mapCountry = require('./map-country');
const mapPeriodDays = require('./map-period-days');
const mapPolicyLength = require('./map-policy-length');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');
const { SUMMARY_ANSWERS } = require('../../content-strings');
const formatCurrency = require('../format-currency');
const { mockAnswers } = require('../../test-mocks');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER,
  TRIED_PRIVATE_COVER_YES,
  TRIED_PRIVATE_COVER_NO,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
} = FIELD_IDS;

describe('sever/helpers/map-answers-to-content', () => {
  describe('mapCurrency', () => {
    it('should return a formatted string', () => {
      const currency = mockAnswers[FIELD_IDS.CURRENCY];

      const result = mapCurrency(currency);

      const expected = `${currency.name} (${currency.isoCode})`;

      expect(result).toEqual(expected);
    });

    describe('when there is no object/values', () => {
      it('should return a dash', () => {
        const result = mapCurrency();

        expect(result).toEqual('-');
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

  describe('mapTriedPrivateCover', () => {
    describe('when answer is yes', () => {
      it(`should return an object with ${TRIED_PRIVATE_COVER_YES} and mapped summary answer`, () => {
        const mockAnswer = FIELD_VALUES.TRIED_PRIVATE_COVER.YES;

        const result = mapTriedPrivateCover(mockAnswer);

        const expected = {
          [TRIED_PRIVATE_COVER_YES]: {
            text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER_YES],
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when answer is no', () => {
      it(`should return an object with ${TRIED_PRIVATE_COVER_NO} and mapped summary answer`, () => {
        const mockAnswer = FIELD_VALUES.TRIED_PRIVATE_COVER.NO;

        const result = mapTriedPrivateCover(mockAnswer);

        const expected = {
          [TRIED_PRIVATE_COVER_NO]: {
            text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER_NO],
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
        ...mapTriedPrivateCover(mockAnswers[TRIED_PRIVATE_COVER]),
        [UK_CONTENT_PERCENTAGE]: {
          text: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
        },
        [AMOUNT]: {
          text: formatCurrency(mockAnswers[AMOUNT], 'GBP'),
        },
        [CURRENCY]: {
          text: mapCurrency(mockAnswers[CURRENCY]),
        },
        [CREDIT_PERIOD]: {
          text: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        },
        ...mapPolicyType(mockAnswers[POLICY_TYPE]),
        ...mapPolicyLength(mockAnswers),
      };

      expect(result).toEqual(expected);
    });
  });
});

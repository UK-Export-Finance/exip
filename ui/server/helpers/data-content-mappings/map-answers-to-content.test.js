const {
  mapCurrency,
  mapPreCreditPeriod,
  mapPolicyType,
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
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
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

  describe('mapPreCreditPeriod', () => {
    it('should return a formatted string', () => {
      const result = mapPreCreditPeriod(20);

      const expected = mapPeriodDays(20);

      expect(result).toEqual(expected);
    });

    describe('when there is no value', () => {
      it('should return a dash', () => {
        const result = mapPreCreditPeriod();

        expect(result).toEqual('-');
      });
    });
  });

  describe('mapPolicyType', () => {
    describe('when policy type is single', () => {
      it(`should return an object with ${SINGLE_POLICY_TYPE}`, () => {
        const mockAnswersSinglePolicyType = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        };

        const result = mapPolicyType(mockAnswersSinglePolicyType);

        const expected = {
          [SINGLE_POLICY_TYPE]: {
            text: mockAnswersSinglePolicyType[POLICY_TYPE],
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is single', () => {
      it(`should return an object with ${MULTI_POLICY_TYPE}`, () => {
        const mockAnswersMultiPolicyType = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        };

        const result = mapPolicyType(mockAnswersMultiPolicyType);

        const expected = {
          [MULTI_POLICY_TYPE]: {
            text: mockAnswersMultiPolicyType[POLICY_TYPE],
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
        [TRIED_PRIVATE_COVER]: {
          text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER],
        },
        [UK_CONTENT_PERCENTAGE]: {
          text: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
        },
        [AMOUNT]: {
          text: formatCurrency(mockAnswers[AMOUNT], 'GBP'),
        },
        [CURRENCY]: {
          text: mapCurrency(mockAnswers[CURRENCY]),
        },
        [PRE_CREDIT_PERIOD]: {
          text: mapPreCreditPeriod(mockAnswers[PRE_CREDIT_PERIOD]),
        },
        [CREDIT_PERIOD]: {
          text: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        },
        ...mapPolicyType(mockAnswers),
        ...mapPolicyLength(mockAnswers),
      };

      expect(result).toEqual(expected);
    });
  });
});

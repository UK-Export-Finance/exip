const {
  mapPeriodDays,
  mapPeriodMonths,
  mapPolicyLength,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY } = require('../content-strings');
const formatCurrency = require('./format-currency');
const { mockAnswers } = require('../test-mocks');

describe('sever/helpers/map-answers-to-content', () => {
  describe('mapPeriodDays', () => {
    it('should return a formatted string', () => {
      const result = mapPeriodDays(20);

      const expected = '20 days';

      expect(result).toEqual(expected);
    });
  });

  describe('mapPeriodMonths', () => {
    it('should return a formatted string', () => {
      const result = mapPeriodMonths(20);

      const expected = '20 months';

      expect(result).toEqual(expected);
    });
  });

  describe('mapPolicyLength', () => {
    describe(`when ${FIELD_IDS.SINGLE_POLICY_LENGTH} exists`, () => {
      it(`should return mapped ${FIELD_IDS.SINGLE_POLICY_LENGTH} object`, () => {
        mockAnswers[FIELD_IDS.SINGLE_POLICY_LENGTH] = 10;

        const result = mapPolicyLength(mockAnswers);

        const expected = {
          [FIELD_IDS.SINGLE_POLICY_LENGTH]: mapPeriodMonths(mockAnswers[FIELD_IDS.SINGLE_POLICY_LENGTH]),
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.MULTI_POLICY_LENGTH} exists`, () => {
      it(`should return mapped ${FIELD_IDS.MULTI_POLICY_LENGTH}`, () => {
        mockAnswers[FIELD_IDS.MULTI_POLICY_LENGTH] = 10;

        const result = mapPolicyLength(mockAnswers);

        const expected = {
          [FIELD_IDS.MULTI_POLICY_LENGTH]: mapPeriodMonths(mockAnswers[FIELD_IDS.MULTI_POLICY_LENGTH]),
        };

        expect(result).toEqual(expected);
      });
    });

    it('should return null', () => {
      const result = mapPolicyLength({});

      expect(result).toEqual(null);
    });
  });

  describe('mapAnswersToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const {
        VALID_COMPANY_BASE,
        VALID_BUYER_BASE,
        TRIED_PRIVATE_COVER,
        UK_CONTENT_PERCENTAGE,
        CURRENCY,
        AMOUNT,
        PRE_CREDIT_PERIOD,
        CREDIT_PERIOD,
        POLICY_TYPE,
      } = FIELD_IDS;

      const result = mapAnswersToContent(mockAnswers);

      const expected = {
        [VALID_COMPANY_BASE]: SUMMARY[VALID_COMPANY_BASE],
        [VALID_BUYER_BASE]: SUMMARY[VALID_BUYER_BASE],
        [TRIED_PRIVATE_COVER]: SUMMARY[TRIED_PRIVATE_COVER],
        [UK_CONTENT_PERCENTAGE]: SUMMARY[UK_CONTENT_PERCENTAGE],
        [AMOUNT]: formatCurrency(mockAnswers[AMOUNT], 'GBP'),
        [CURRENCY]: mockAnswers[CURRENCY],
        [PRE_CREDIT_PERIOD]: mapPeriodDays(mockAnswers[PRE_CREDIT_PERIOD]),
        [CREDIT_PERIOD]: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
        ...mapPolicyLength(mockAnswers),
      };

      expect(result).toEqual(expected);
    });
  });
});

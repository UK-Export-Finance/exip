const {
  mapPeriodDays,
  mapPeriodMonths,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY_ANSWERS } = require('../content-strings');
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
        POLICY_LENGTH,
      } = FIELD_IDS;

      const result = mapAnswersToContent(mockAnswers);

      const expected = {
        [VALID_COMPANY_BASE]: SUMMARY_ANSWERS[VALID_COMPANY_BASE],
        [VALID_BUYER_BASE]: SUMMARY_ANSWERS[VALID_BUYER_BASE],
        [TRIED_PRIVATE_COVER]: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER],
        [UK_CONTENT_PERCENTAGE]: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
        [AMOUNT]: formatCurrency(mockAnswers[AMOUNT], 'GBP'),
        [CURRENCY]: mockAnswers[CURRENCY],
        [PRE_CREDIT_PERIOD]: mapPeriodDays(mockAnswers[PRE_CREDIT_PERIOD]),
        [CREDIT_PERIOD]: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
        [POLICY_LENGTH]: mapPeriodMonths(mockAnswers[POLICY_LENGTH]),
      };

      expect(result).toEqual(expected);
    });
  });
});

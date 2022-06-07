const {
  mapPercentage,
  mapPeriodDays,
  mapPeriodMonths,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY } = require('../content-strings');
const formatCurrency = require('./format-currency');
const { mockAnswers } = require('../test-mocks');

describe('sever/helpers/map-answers-to-content', () => {
  describe('mapPercentage', () => {
    it('should return a formatted string', () => {
      const result = mapPercentage(20);

      const expected = `${20}%`;

      expect(result).toEqual(expected);
    });
  });

  describe('mapPeriodDays', () => {
    it('should return a formatted string', () => {
      const result = mapPeriodDays(20);

      const expected = `${20} days`;

      expect(result).toEqual(expected);
    });
  });

  describe('mapPeriodMonths', () => {
    it('should return a formatted string', () => {
      const result = mapPeriodMonths(20);

      const expected = `${20} months`;

      expect(result).toEqual(expected);
    });
  });

  describe('mapAnswersToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const {
        VALID_COMPANY_BASE,
        VALID_BUYER_BASE,
        TRIED_PRIVATE_COVER,
        FINAL_DESTINATION,
        UK_CONTENT_PERCENTAGE,
        CREDIT_LIMIT,
        PRE_CREDIT_PERIOD,
        CREDIT_PERIOD,
        POLICY_LENGTH,
        POLICY_TYPE,
      } = FIELD_IDS;

      const result = mapAnswersToContent(mockAnswers);

      const expected = {
        [VALID_COMPANY_BASE]: SUMMARY[VALID_COMPANY_BASE],
        [VALID_BUYER_BASE]: SUMMARY[VALID_BUYER_BASE],
        [TRIED_PRIVATE_COVER]: SUMMARY[TRIED_PRIVATE_COVER],
        [FINAL_DESTINATION]: mockAnswers[FINAL_DESTINATION],
        [UK_CONTENT_PERCENTAGE]: mapPercentage(mockAnswers[UK_CONTENT_PERCENTAGE]),
        [CREDIT_LIMIT]: formatCurrency(mockAnswers[CREDIT_LIMIT], 'GBP'),
        [PRE_CREDIT_PERIOD]: mapPeriodDays(mockAnswers[PRE_CREDIT_PERIOD]),
        [CREDIT_PERIOD]: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        [POLICY_LENGTH]: mapPeriodMonths(mockAnswers[POLICY_LENGTH]),
        [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
      };

      expect(result).toEqual(expected);
    });
  });
});

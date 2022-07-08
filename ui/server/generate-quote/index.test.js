const {
  calculateCost,
  generateQuote,
} = require('.');
const { FIELD_IDS } = require('../constants');
const { getPremiumRate } = require('./get-premium-rate');
const { mockSession } = require('../test-mocks');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

describe('server/generate-quote/index', () => {
  describe('calculateCost', () => {
    it('should return a cost', () => {
      const result = calculateCost();

      const expected = 1000;

      expect(result).toEqual(expected);
    });
  });

  describe('generateQuote', () => {
    it('should return a quote', () => {
      const mockSubmittedData = mockSession.submittedData;

      const result = generateQuote(mockSubmittedData);

      const mockPercentageOfCover = 90;

      const expectedPremiumRate = getPremiumRate(
        mockSubmittedData[POLICY_TYPE],
        mockSubmittedData[BUYER_COUNTRY].riskCategory,
        mockSubmittedData[POLICY_LENGTH],
        mockPercentageOfCover,
      );

      const expected = {
        [AMOUNT]: mockSubmittedData[AMOUNT],
        [CURRENCY]: mockSubmittedData[CURRENCY],
        [QUOTE.BUYER_LOCATION]: mockSubmittedData[BUYER_COUNTRY],
        [POLICY_TYPE]: mockSubmittedData[POLICY_TYPE],
        [POLICY_LENGTH]: mockSubmittedData[POLICY_LENGTH],
        [QUOTE.PREMIUM_RATE_PERCENTAGE]: expectedPremiumRate,
        [QUOTE.ESTIMATED_COST]: calculateCost(
          expectedPremiumRate,
          mockSubmittedData[AMOUNT],
          mockPercentageOfCover,
        ),
      };

      expect(result).toEqual(expected);
    });
  });
});

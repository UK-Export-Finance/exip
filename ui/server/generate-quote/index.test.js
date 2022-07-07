const {
  mockCalculation,
  generateQuote,
} = require('.');
const { FIELD_IDS } = require('../constants');
const { mockSession } = require('../test-mocks');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

describe('server/generate-quote/inde', () => {
  describe('mockCalculation', () => {
    describe('when `DZA` country code is provided', () => {
      it('should return a premium rate and estimated cost', () => {
        const result = mockCalculation('DZA');

        const expected = {
          [QUOTE.PREMIUM_RATE_PERCENTAGE]: 1.88,
          [QUOTE.ESTIMATED_COST]: 1128,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when `BHR` country code is provided', () => {
      it('should return a premium rate and estimated cost', () => {
        const result = mockCalculation('BHR');

        const expected = {
          [QUOTE.PREMIUM_RATE_PERCENTAGE]: 2.38,
          [QUOTE.ESTIMATED_COST]: 1428,
        };

        expect(result).toEqual(expected);
      });
    });

    it('should return a default premium rate and estimated cost', () => {
      const result = mockCalculation('FRA');

      const expected = {
        [QUOTE.PREMIUM_RATE_PERCENTAGE]: 1.5,
        [QUOTE.ESTIMATED_COST]: 1000,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('generateQuote', () => {
    it('should return a quote', () => {
      const mockSubmittedData = mockSession.submittedData;
      const result = generateQuote(mockSubmittedData);

      const expected = {
        [AMOUNT]: mockSubmittedData[AMOUNT],
        [CURRENCY]: mockSubmittedData[CURRENCY],
        ...mockCalculation(mockSubmittedData[BUYER_COUNTRY].isoCode),
        [QUOTE.BUYER_LOCATION]: mockSubmittedData[BUYER_COUNTRY],
        [POLICY_TYPE]: mockSubmittedData[POLICY_TYPE],
        [POLICY_LENGTH]: mockSubmittedData[POLICY_LENGTH],
      };

      expect(result).toEqual(expected);
    });
  });
});

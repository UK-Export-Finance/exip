const mapQuoteToContent = require('./map-quote-to-content');
const { FIELD_IDS } = require('../../constants');
const mapCountry = require('./map-country');
const mapPolicyLength = require('./map-policy-length');
const formatCurrency = require('../format-currency');
const { mockQuote } = require('../../test-mocks');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
  PERCENTAGE_OF_COVER,
  QUOTE,
} = FIELD_IDS;

const {
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

describe('server/helpers/map-quote-to-content', () => {
  describe('mapQuoteToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const result = mapQuoteToContent(mockQuote);

      const expected = {
        [AMOUNT]: {
          text: formatCurrency(mockQuote[AMOUNT], mockQuote[CURRENCY].isoCode),
        },
        [BUYER_LOCATION]: {
          text: mapCountry(mockQuote[BUYER_COUNTRY]),
        },
        [ESTIMATED_COST]: {
          text: formatCurrency(mockQuote[ESTIMATED_COST], mockQuote[CURRENCY].isoCode),
        },
        [PERCENTAGE_OF_COVER]: {
          text: `${mockQuote[PERCENTAGE_OF_COVER]}%`,
        },
        [PREMIUM_RATE_PERCENTAGE]: {
          text: `${mockQuote[PREMIUM_RATE_PERCENTAGE]}%`,
        },
        ...mapPolicyLength(mockQuote),
      };

      expect(result).toEqual(expected);
    });
  });
});

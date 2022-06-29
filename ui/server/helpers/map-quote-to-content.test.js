const {
  mapInsuredFor,
  mapQuoteToContent,
} = require('./map-quote-to-content');
const { FIELD_IDS } = require('../constants');
const {
  mapPolicyLength,
  mapCountry,
} = require('./map-answers-to-content');
const formatCurrency = require('./format-currency');
const { mockQuote } = require('../test-mocks');

const {
  BUYER_COUNTRY,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

describe('sever/helpers/map-quote-to-content', () => {
  describe('mapInsuredFor', () => {
    describe('when country code is GBP', () => {
      it('should return an object without `convertedFrom`', () => {
        const mockField = {
          amount: 100,
          convertedFrom: {
            isoCode: 'GBP',
          },
        };

        const result = mapInsuredFor(mockField);

        const expected = {
          text: formatCurrency(mockField.amount, 'GBP'),
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when country code is NOT GBP', () => {
      it('should return an object with `convertedFrom` and additionalText', () => {
        const mockField = {
          amount: 100,
          convertedFrom: {
            isoCode: 'EUR',
            name: 'Euro',
          },
        };

        const result = mapInsuredFor(mockField);

        const expected = {
          text: formatCurrency(mockField.amount, 'EUR'),
          additionalText: `converted from ${mockField.convertedFrom.name} (${mockField.convertedFrom.isoCode})`,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapQuoteToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const result = mapQuoteToContent(mockQuote);

      const expected = {
        [INSURED_FOR]: mapInsuredFor(mockQuote[INSURED_FOR]),
        [PREMIUM_RATE_PERCENTAGE]: {
          text: `${mockQuote[PREMIUM_RATE_PERCENTAGE]}%`,
        },
        [ESTIMATED_COST]: {
          text: formatCurrency(mockQuote[ESTIMATED_COST], 'GBP'),
        },
        ...mapPolicyLength(mockQuote),
        [BUYER_LOCATION]: {
          text: mapCountry(mockQuote[BUYER_COUNTRY]),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});

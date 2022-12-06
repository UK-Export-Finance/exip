import mapQuoteToContent from './map-quote-to-content';
import { FIELD_IDS } from '../../constants';
import mapCountry from './map-country';
import mapPolicyLength from './map-policy-length';
import formatCurrency from '../format-currency';
import { mockQuote } from '../../test-mocks';
import mapCost from './map-cost';

const { BUYER_COUNTRY, CURRENCY, PERCENTAGE_OF_COVER, QUOTE } = FIELD_IDS;

const { BUYER_LOCATION, ESTIMATED_COST, INSURED_FOR, PREMIUM_RATE_PERCENTAGE } = QUOTE;

describe('server/helpers/map-quote-to-content', () => {
  describe('mapQuoteToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const result = mapQuoteToContent(mockQuote);

      const expected = {
        ...mapCost(mockQuote),
        [PERCENTAGE_OF_COVER]: {
          text: `${mockQuote[PERCENTAGE_OF_COVER]}%`,
        },
        [INSURED_FOR]: {
          text: formatCurrency(mockQuote[INSURED_FOR], mockQuote[CURRENCY].isoCode, 2),
        },
        [PREMIUM_RATE_PERCENTAGE]: {
          text: `${mockQuote[PREMIUM_RATE_PERCENTAGE]}%`,
        },
        [ESTIMATED_COST]: {
          text: formatCurrency(mockQuote[ESTIMATED_COST], mockQuote[CURRENCY].isoCode, 2),
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

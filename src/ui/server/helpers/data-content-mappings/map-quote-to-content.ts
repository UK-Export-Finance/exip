import { FIELD_IDS } from '../../constants';
import mapCountry from './map-country';
import mapPolicyLength from './map-policy-length';
import formatCurrency from '../format-currency';
import { Quote, QuoteContent } from '../../../types';
import mapCost from './map-cost';

const { BUYER_COUNTRY, CURRENCY, PERCENTAGE_OF_COVER, QUOTE } = FIELD_IDS;

const { ESTIMATED_COST, INSURED_FOR, PREMIUM_RATE_PERCENTAGE } = QUOTE;

const mapQuoteToContent = (quote: Quote): QuoteContent => {
  const currencyCode = quote[CURRENCY].isoCode;

  const mapped = {
    ...mapCost(quote),
    percentageOfCover: {
      text: `${quote[PERCENTAGE_OF_COVER]}%`,
    },
    insuredFor: {
      text: formatCurrency(quote[INSURED_FOR], currencyCode, 2),
    },
    premiumRatePercentage: {
      text: `${quote[PREMIUM_RATE_PERCENTAGE]}%`,
    },
    estimatedCost: {
      text: formatCurrency(quote[ESTIMATED_COST], currencyCode, 2),
    },
    ...mapPolicyLength(quote),
    buyerCountry: {
      text: mapCountry(quote[BUYER_COUNTRY]),
    },
  };

  return mapped;
};

export default mapQuoteToContent;

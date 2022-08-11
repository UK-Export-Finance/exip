import { FIELD_IDS } from '../../constants';
import mapCountry from './map-country';
import mapPolicyLength from './map-policy-length';
import formatCurrency from '../format-currency';
import { Quote, QuoteContent } from '../../../types';

const { BUYER_COUNTRY, CURRENCY, PERCENTAGE_OF_COVER, QUOTE } = FIELD_IDS;

const { ESTIMATED_COST, INSURED_FOR, PREMIUM_RATE_PERCENTAGE } = QUOTE;

const mapQuoteToContent = (quote: Quote): QuoteContent => {
  const currencyCode = quote[CURRENCY].isoCode;

  const mapped = {
    insuredFor: {
      text: formatCurrency(quote[INSURED_FOR], currencyCode),
    },
    buyerCountry: {
      text: mapCountry(quote[BUYER_COUNTRY]),
    },
    estimatedCost: {
      text: formatCurrency(quote[ESTIMATED_COST], currencyCode),
    },
    percentageOfCover: {
      text: `${quote[PERCENTAGE_OF_COVER]}%`,
    },
    premiumRatePercentage: {
      text: `${quote[PREMIUM_RATE_PERCENTAGE]}%`,
    },
    ...mapPolicyLength(quote),
  };

  return mapped;
};

export default mapQuoteToContent;

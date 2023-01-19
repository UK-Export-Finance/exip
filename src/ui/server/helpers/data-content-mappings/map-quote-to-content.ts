import { FIELD_IDS } from '../../constants';
import mapCountry from './map-country';
import mapPolicyLength from './map-policy-length';
import formatCurrency from '../format-currency';
import { Quote, QuoteContent } from '../../../types';
import mapCost from './map-cost';

const { BUYER_COUNTRY, CURRENCY, PERCENTAGE_OF_COVER, QUOTE } = FIELD_IDS;

const { ESTIMATED_COST, INSURED_FOR, PREMIUM_RATE_PERCENTAGE } = QUOTE;

/**
 * mapQuoteToContent
 * Map all quote values (generated from submitted data and calculator) into an object structure for GOVUK summary list structure
 * @param {Object} Quote
 * @returns {Object} All quote values in an object structure with 'text' field
 */
const mapQuoteToContent = (quote: Quote): QuoteContent => {
  const currencyCode = quote[CURRENCY].isoCode;

  const mapped = {
    ...mapCost(quote),
    percentageOfCover: `${quote[PERCENTAGE_OF_COVER]}%`,
    insuredFor: formatCurrency(quote[INSURED_FOR], currencyCode, 2),
    premiumRatePercentage: `${quote[PREMIUM_RATE_PERCENTAGE]}%`,
    estimatedCost: formatCurrency(quote[ESTIMATED_COST], currencyCode, 2),
    ...mapPolicyLength(quote),
    buyerCountry: mapCountry(quote[BUYER_COUNTRY]),
  };

  return mapped;
};

export default mapQuoteToContent;

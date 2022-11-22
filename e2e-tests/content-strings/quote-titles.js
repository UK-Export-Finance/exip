import { FIELD_IDS } from '../constants/field-ids';

export const QUOTE_TITLES = {
  [FIELD_IDS.CONTRACT_VALUE]: 'Contract value',
  [FIELD_IDS.MAX_AMOUNT_OWED]: 'Maximum buyer will owe at any point',
  [`${[FIELD_IDS.QUOTE.INSURED_FOR]}_SINGLE_POLICY`]: "You'll be insured for",
  [`${[FIELD_IDS.QUOTE.INSURED_FOR]}_MULTI_POLICY`]: "Maximum you'll be insured for",
  [FIELD_IDS.PERCENTAGE_OF_COVER]: 'Percentage of cover',
  [FIELD_IDS.QUOTE.PREMIUM_RATE_PERCENTAGE]: 'Premium rate percentage',
  [FIELD_IDS.QUOTE.ESTIMATED_COST]: 'Estimated cost to you',
  [FIELD_IDS.POLICY_LENGTH]: 'Policy length',
  [FIELD_IDS.QUOTE.BUYER_LOCATION]: 'Buyer location',
};

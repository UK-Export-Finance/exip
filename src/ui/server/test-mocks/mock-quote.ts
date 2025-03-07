import { Quote } from '../../types';
import { FIELD_IDS } from '../constants';
import mockAnswers from './mock-answers';
import { mockCountryCanGetAQuoteOnline } from './mock-countries';
import { GBP } from './mock-currencies';

const {
  ELIGIBILITY: { CONTRACT_VALUE },
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

const mockQuote = {
  buyerCountry: mockCountryCanGetAQuoteOnline,
  contractValue: mockAnswers[CONTRACT_VALUE],
  insuredFor: mockAnswers[CONTRACT_VALUE],
  currency: GBP,
  premiumRatePercentage: 1.23,
  estimatedCost: 456,
  policyType: mockAnswers[POLICY_TYPE],
  policyLength: mockAnswers[POLICY_LENGTH],
  percentageOfCover: 90,
} as Quote;

export default mockQuote;

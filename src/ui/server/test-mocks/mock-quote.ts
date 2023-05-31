import { Quote } from '../../types';
import { FIELD_IDS } from '../constants';
import mockAnswers from './mock-answers';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CONTRACT_VALUE, CURRENCY },
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

const mockQuote = {
  buyerCountry: {
    name: mockAnswers[BUYER_COUNTRY],
    isoCode: 'DZA',
  },
  contractValue: mockAnswers[CONTRACT_VALUE],
  insuredFor: mockAnswers[CONTRACT_VALUE],
  currency: {
    name: 'UK Sterling',
    isoCode: mockAnswers[CURRENCY],
  },
  premiumRatePercentage: 1.23,
  estimatedCost: 456,
  policyType: mockAnswers[POLICY_TYPE],
  policyLength: mockAnswers[POLICY_LENGTH],
  percentageOfCover: 90,
} as Quote;

export default mockQuote;

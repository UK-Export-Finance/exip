import { Quote } from '../../types';
import { FIELD_IDS } from '../constants';
import mockAnswers from './mock-answers';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CURRENCY,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const mockQuote = {
  [QUOTE.INSURED_FOR]: mockAnswers[CONTRACT_VALUE],
  [CURRENCY]: {
    name: 'UK Sterling',
    isoCode: mockAnswers[CURRENCY],
  },
  [QUOTE.PREMIUM_RATE_PERCENTAGE]: 1.23,
  [QUOTE.ESTIMATED_COST]: 456,
  [QUOTE.BUYER_LOCATION]: mockAnswers[BUYER_COUNTRY],
  [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
  [POLICY_LENGTH]: mockAnswers[POLICY_LENGTH],
  [PERCENTAGE_OF_COVER]: 90
} as Quote;

export default mockQuote;

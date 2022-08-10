import { API, FIELD_IDS } from '../constants';
import mockAnswers from './mock-answers';

const {
  BUYER_COUNTRY,
  CURRENCY,
} = FIELD_IDS;

const mockSession = {
  submittedData: {
    ...mockAnswers,
    [BUYER_COUNTRY]: {
      name: mockAnswers[BUYER_COUNTRY],
      isoCode: 'FRA',
      riskCategory: API.MAPPINGS.RISK.STANDARD,
    },
    [CURRENCY]: {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
  },
};

export default mockSession;

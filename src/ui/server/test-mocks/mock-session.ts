import { API, FIELD_IDS } from '../constants';
import mockAnswers from './mock-answers';
import { RequestSession } from '../../types';

const { BUYER_COUNTRY, CURRENCY } = FIELD_IDS;

const mockSession = {
  submittedData: {
    quoteEligibility: {
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
    insuranceEligibility: {},
  },
} as RequestSession;

export default mockSession;

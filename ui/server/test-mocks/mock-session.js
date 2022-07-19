const {
  FIELD_IDS,
  API,
} = require('../constants');
const mockAnswers = require('./mock-answers');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
} = FIELD_IDS;

const mockSession = {
  submittedData: {
    ...mockAnswers,
    [AMOUNT]: Number(mockAnswers[AMOUNT]),
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

module.exports = mockSession;

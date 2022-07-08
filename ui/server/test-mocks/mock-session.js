const FIELD_IDS = require('../constants/field-ids');
const mockAnswers = require('./mock-answers');

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
      riskCategory: 3,
    },
    [CURRENCY]: {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
  },
};

module.exports = mockSession;

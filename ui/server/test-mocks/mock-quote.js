const FIELD_IDS = require('../constants/field-ids');
const mockAnswers = require('./mock-answers');

const {
  AMOUNT,
  CURRENCY,
  BUYER_COUNTRY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const mockQuote = {
  [QUOTE.INSURED_FOR]: {
    amount: mockAnswers[AMOUNT],
    convertedFrom: mockAnswers[CURRENCY],
  },
  [QUOTE.PREMIUM_RATE_PERCENTAGE]: 123,
  [QUOTE.ESTIMATED_COST]: 456,
  [QUOTE.BUYER_LOCATION]: mockAnswers[BUYER_COUNTRY],
  [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
  [POLICY_LENGTH]: mockAnswers[POLICY_LENGTH],
};

module.exports = mockQuote;

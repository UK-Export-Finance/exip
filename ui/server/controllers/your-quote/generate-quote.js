const { FIELD_IDS } = require('../../constants');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const generateQuote = (submittedData, amountInGbp) => {
  const quote = {
    [QUOTE.INSURED_FOR]: {
      amount: (amountInGbp || submittedData[AMOUNT]),
      convertedFrom: submittedData[CURRENCY],
    },
    [QUOTE.PREMIUM_RATE_PERCENTAGE]: 123,
    [QUOTE.ESTIMATED_COST]: 456,
    [QUOTE.BUYER_LOCATION]: submittedData[BUYER_COUNTRY],
    [POLICY_TYPE]: submittedData[POLICY_TYPE],
    [POLICY_LENGTH]: submittedData[POLICY_LENGTH],
  };

  return quote;
};

module.exports = generateQuote;

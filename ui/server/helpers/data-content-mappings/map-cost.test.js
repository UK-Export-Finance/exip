const mapCost = require('./map-cost');
const formatCurrency = require('../format-currency');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');

const {
  CONTRACT_VALUE,
  CURRENCY,
  MAX_AMOUNT_OWED,
  POLICY_TYPE,
} = FIELD_IDS;

describe('server/helpers/data-content-mappings/map-cost', () => {
  describe('when policy type is single', () => {
    it(`should return an object with formatted ${CONTRACT_VALUE}`, () => {
      const mockAnswersSinglePolicyType = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        [CURRENCY]: {
          isoCode: 'GBP',
        },
        [CONTRACT_VALUE]: 10,
      };

      const result = mapCost(mockAnswersSinglePolicyType);

      const expected = {
        [CONTRACT_VALUE]: {
          text: formatCurrency(mockAnswersSinglePolicyType[CONTRACT_VALUE], mockAnswersSinglePolicyType[CURRENCY].isoCode),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when policy type is multi', () => {
    it(`should return an object with formatted ${MAX_AMOUNT_OWED}`, () => {
      const mockAnswersMultiPolicyType = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        [CURRENCY]: {
          isoCode: 'GBP',
        },
        [MAX_AMOUNT_OWED]: 10,
      };

      const result = mapCost(mockAnswersMultiPolicyType);

      const expected = {
        [MAX_AMOUNT_OWED]: {
          text: formatCurrency(mockAnswersMultiPolicyType[MAX_AMOUNT_OWED], mockAnswersMultiPolicyType[CURRENCY].isoCode),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});

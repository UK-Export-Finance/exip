const mapPolicyLength = require('./map-policy-length');
const mapPeriodMonths = require('./map-period-months');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');

const {
  POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

describe('server/helpers/map-policy-length', () => {
  describe('when policy type is single', () => {
    it(`should return an object with mapped ${SINGLE_POLICY_LENGTH}`, () => {
      const mockAnswersSinglePolicyType = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        [POLICY_LENGTH]: 10,
      };

      const result = mapPolicyLength(mockAnswersSinglePolicyType);

      const expected = {
        [SINGLE_POLICY_LENGTH]: {
          text: mapPeriodMonths(mockAnswersSinglePolicyType[POLICY_LENGTH]),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when policy type is multi', () => {
    it(`should return an object with mapped ${MULTI_POLICY_LENGTH}`, () => {
      const mockAnswersMultiPolicyType = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        [POLICY_LENGTH]: 10,
      };

      const result = mapPolicyLength(mockAnswersMultiPolicyType);

      const expected = {
        [MULTI_POLICY_LENGTH]: {
          text: mapPeriodMonths(mockAnswersMultiPolicyType[POLICY_LENGTH]),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});

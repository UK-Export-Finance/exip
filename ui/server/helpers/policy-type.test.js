const {
  isSinglePolicyType,
  isMultiPolicyType,
} = require('./policy-type');
const { FIELD_VALUES } = require('../constants');

describe('server/helpers/policy-type', () => {
  describe('isSinglePolicyType', () => {
    describe('when policy type is single', () => {
      it('should return true', () => {
        const result = isSinglePolicyType(FIELD_VALUES.POLICY_TYPE.SINGLE);

        expect(result).toEqual(true);
      });
    });

    describe('when policy type is NOT single', () => {
      it('should return false', () => {
        const result = isSinglePolicyType(FIELD_VALUES.POLICY_TYPE.MULTI);

        expect(result).toEqual(false);
      });
    });
  });

  describe('isMultiPolicyType', () => {
    describe('when policy type is multi', () => {
      it('should return true', () => {
        const result = isMultiPolicyType(FIELD_VALUES.POLICY_TYPE.MULTI);

        expect(result).toEqual(true);
      });
    });

    describe('when policy type is NOT multi', () => {
      it('should return false', () => {
        const result = isMultiPolicyType(FIELD_VALUES.POLICY_TYPE.SINGLE);

        expect(result).toEqual(false);
      });
    });
  });
});

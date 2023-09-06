import { isSinglePolicyType, isMultiplePolicyType } from '.';
import { FIELD_VALUES } from '../../constants';

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
        const result = isSinglePolicyType(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        expect(result).toEqual(false);
      });
    });
  });

  describe('isMultiplePolicyType', () => {
    describe('when policy type is multiple', () => {
      it('should return true', () => {
        const result = isMultiplePolicyType(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        expect(result).toEqual(true);
      });
    });

    describe('when policy type is NOT multi', () => {
      it('should return false', () => {
        const result = isMultiplePolicyType(FIELD_VALUES.POLICY_TYPE.SINGLE);

        expect(result).toEqual(false);
      });
    });
  });
});

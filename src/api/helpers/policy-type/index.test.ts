import { isSinglePolicyType, isMultiPolicyType } from '.';
import { FIELD_VALUES } from '../../constants';

describe('api/generate-xlsx/map-application-to-xlsx/helpers/policy-type', () => {
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

  describe('isMultiPolicyType', () => {
    describe('when policy type is multiple', () => {
      it('should return true', () => {
        const result = isMultiPolicyType(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

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

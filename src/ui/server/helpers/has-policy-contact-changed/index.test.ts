import hasPolicyContactChanged from '.';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { mockContact } from '../../test-mocks';
import { ApplicationPolicyContact } from '../../../types';

const {
  NAME_ON_POLICY: { IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

describe('server/helpers/is-policy-contact-changed', () => {
  const mockNewBody = {
    id: '1',
    [IS_SAME_AS_OWNER]: false,
  } as ApplicationPolicyContact;

  describe(`when application ${IS_SAME_AS_OWNER} is true and body ${IS_SAME_AS_OWNER} is set to false`, () => {
    it('should return true', () => {
      mockContact[IS_SAME_AS_OWNER] = true;

      const result = hasPolicyContactChanged(mockContact, mockNewBody);

      expect(result).toEqual(true);
    });
  });

  describe(`when application ${IS_SAME_AS_OWNER} is true and body ${IS_SAME_AS_OWNER} is set to true`, () => {
    it('should return false', () => {
      mockContact[IS_SAME_AS_OWNER] = true;
      mockNewBody[IS_SAME_AS_OWNER] = true;

      const result = hasPolicyContactChanged(mockContact, mockNewBody);

      expect(result).toEqual(false);
    });
  });

  describe(`when application ${IS_SAME_AS_OWNER} is false and body ${IS_SAME_AS_OWNER} is set to false`, () => {
    it('should return false', () => {
      mockContact[IS_SAME_AS_OWNER] = false;
      mockNewBody[IS_SAME_AS_OWNER] = false;

      const result = hasPolicyContactChanged(mockContact, mockNewBody);

      expect(result).toEqual(false);
    });
  });

  describe(`when application ${IS_SAME_AS_OWNER} is true and body ${IS_SAME_AS_OWNER} is set to true`, () => {
    it('should return true', () => {
      mockContact[IS_SAME_AS_OWNER] = false;
      mockNewBody[IS_SAME_AS_OWNER] = true;

      const result = hasPolicyContactChanged(mockContact, mockNewBody);

      expect(result).toEqual(true);
    });
  });
});

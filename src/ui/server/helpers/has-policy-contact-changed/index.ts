import { ApplicationPolicyContact } from '../../../types';
import POLICY_AND_EXPORTS_FIELD_IDS from '../../constants/field-ids/insurance/policy-and-exports';

const {
  NAME_ON_POLICY: { IS_SAME_AS_OWNER },
} = POLICY_AND_EXPORTS_FIELD_IDS;

/**
 * checks if policyContact isSameAsOwner has changed
 * returns true if has changed
 * @param {ApplicationPolicyContact} oldPolicyContact - old policyContact data before update
 * @param {ApplicationPolicyContact} newPolicyContact - updated policyContact data after update
 * @returns {Boolean}
 */
const hasPolicyContactChanged = (oldPolicyContact: ApplicationPolicyContact, newPolicyContact: ApplicationPolicyContact) =>
  oldPolicyContact[IS_SAME_AS_OWNER] !== newPolicyContact[IS_SAME_AS_OWNER];

export default hasPolicyContactChanged;

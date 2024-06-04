import { ApplicationPolicyContact } from '../../../types';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  NAME_ON_POLICY: { IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

/**
 * hasPolicyContactChanged
 * check if policyContact IS_SAME_AS_OWNER has changed
 * @param {ApplicationPolicyContact} oldPolicyContact: Old policyContact data before update
 * @param {ApplicationPolicyContact} newPolicyContact: Updated policyContact data after update
 * @returns {Boolean}
 */
const hasPolicyContactChanged = (oldPolicyContact: ApplicationPolicyContact, newPolicyContact: ApplicationPolicyContact) =>
  oldPolicyContact[IS_SAME_AS_OWNER] !== newPolicyContact[IS_SAME_AS_OWNER];

export default hasPolicyContactChanged;

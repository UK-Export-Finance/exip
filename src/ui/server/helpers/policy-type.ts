import { FIELD_VALUES } from '../constants';

const isSinglePolicyType = (policyType: string) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    return true;
  }

  return false;
};

const isMultiPolicyType = (policyType: string) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTI) {
    return true;
  }

  return false;
};

export { isSinglePolicyType, isMultiPolicyType };

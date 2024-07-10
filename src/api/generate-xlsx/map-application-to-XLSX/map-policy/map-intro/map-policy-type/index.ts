import { APPLICATION } from '../../../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../../../helpers/policy-type';

const {
  POLICY_TYPE: { ABBREVIATED },
} = APPLICATION;

/**
 * mapPolicyType
 * Map a policy type into an abbreviated string, for XLSX generation
 * @param {String} policyType: Application "Policy type"
 * @returns {String} Abbreviated policy type
 */
const mapPolicyType = (policyType: string) => {
  if (isSinglePolicyType(policyType)) {
    return ABBREVIATED.SINGLE;
  }

  if (isMultiplePolicyType(policyType)) {
    return ABBREVIATED.MULTIPLE;
  }
};

export default mapPolicyType;

/**
 * hasPolicyTypeChanged
 * check if a new policy type has been submitted,
 * that does not match the application's policy type.
 * @param {string} formPolicyType: Submitted policy type.
 * @param {string} applicationPolicyType: Application policy type.
 * @returns {boolean}
 */
const hasPolicyTypeChanged = (formPolicyType?: string, applicationPolicyType?: string) => {
  if (formPolicyType && applicationPolicyType) {
    if (formPolicyType !== applicationPolicyType) {
      return true;
    }
  }

  return false;
};

export default hasPolicyTypeChanged;

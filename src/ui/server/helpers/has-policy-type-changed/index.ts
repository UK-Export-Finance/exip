/**
 * hasPolicyTypeChanged
 * check if a new policy type has been submitted,
 * that does not match the application's policy type.
 * @param {String} formPolicyType: Submitted policy type.
 * @param {String} applicationPolicyType: Application policy type.
 * @returns {Boolean}
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

/**
 * shouldNullifyCompanyDifferentAddress
 * Check if we should nullify "company different address" data.
 * If hasDifferentTradingAddress is false and an address is populated data should be nullified.
 * @param {string} hasDifferentTradingAddress: Has different trading address flag
 * @param {string} address: Address
 * @returns {boolean}
 */
const shouldNullifyCompanyDifferentAddress = (hasDifferentTradingAddress: string, address?: string) => {
  if (hasDifferentTradingAddress === 'false' && address) {
    return true;
  }

  return false;
};

export default shouldNullifyCompanyDifferentAddress;

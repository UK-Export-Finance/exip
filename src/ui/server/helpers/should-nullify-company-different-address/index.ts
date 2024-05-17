/**
 * shouldNullifyCompanyDifferentAddress
 * Check if we should nullify "company different address" data.
 * If hasDifferentTradingAddress is false and an address is populated data should be nullified.
 * @param {String} hasDifferentTradingAddress: Has different trading address flag
 * @param {String} address: Address
 * @returns {Boolean}
 */
const shouldNullifyCompanyDifferentAddress = (hasDifferentTradingAddress: string, address?: string) => {
  if (hasDifferentTradingAddress === 'false' && address) {
    return true;
  }

  return false;
};

export default shouldNullifyCompanyDifferentAddress;

import encrypt from '../encrypt';
import { ApplicationLossPayeeFinancialUk } from '../../types';

/**
 * mapLossPayeeFinancialDetails
 * maps loss payee financial details to generate object for saving
 * @param {ApplicationLossPayeeFinancialUk} variables: loss payee financial uk variables
 * @returns {Object} mapped data for saving
 */
const mapLossPayeeFinancialDetailsUk = (variables: ApplicationLossPayeeFinancialUk) => {
  const { accountNumber, sortCode, bankAddress } = variables;

  let accountNumberData = {
    value: '',
    iv: '',
  };

  let sortCodeData = {
    value: '',
    iv: '',
  };

  if (accountNumber) {
    accountNumberData = encrypt(accountNumber);
  }

  if (sortCode) {
    sortCodeData = encrypt(sortCode);
  }

  /**
   * object with encrypted data and initialisation vectors
   * encrypts accountNumber and sortCode
   * adds the initialisation vectors
   */
  const updateData = {
    accountNumber: accountNumberData.value,
    accountNumberVector: accountNumberData.iv,
    sortCode: sortCodeData.value,
    sortCodeVector: sortCodeData.iv,
    bankAddress,
  };

  return updateData;
};

export default mapLossPayeeFinancialDetailsUk;

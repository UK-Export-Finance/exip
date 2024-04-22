import encrypt from '../encrypt';
import { DEFAULT_ENCRYPTION_SAVE_OBJECT } from '../../constants';
import { ApplicationLossPayeeFinancialInternational } from '../../types';

/**
 * mapLossPayeeFinancialDetailsInternational
 * maps loss payee financial details to generate object for saving
 * @param {ApplicationLossPayeeFinancialInternational} variables: loss payee financial international variables
 * @returns {Object} mapped data for saving
 */
const mapLossPayeeFinancialDetailsInternational = (variables: ApplicationLossPayeeFinancialInternational) => {
  const { iban, bicSwiftCode, bankAddress } = variables;

  let ibanData = DEFAULT_ENCRYPTION_SAVE_OBJECT;

  let bicSwiftCodeData = DEFAULT_ENCRYPTION_SAVE_OBJECT;

  if (iban) {
    ibanData = encrypt(iban);
  }

  if (bicSwiftCode) {
    bicSwiftCodeData = encrypt(bicSwiftCode);
  }

  /**
   * object with encrypted data and initialisation vectors
   * encrypts iban and bicSwiftCode
   * adds the initialisation vectors
   */
  const updateData = {
    iban: ibanData.value,
    ibanVector: ibanData.iv,
    bicSwiftCode: bicSwiftCodeData.value,
    bicSwiftCodeVector: bicSwiftCodeData.iv,
    bankAddress,
  };

  return updateData;
};

export default mapLossPayeeFinancialDetailsInternational;

import { ApplicationLossPayeeFinancialInternational } from '../../types';
import decryptData from '../decrypt';

/**
 * decryptFinancialInternational
 * decrypts the iban and bicSwiftCode in the financialInternational section of application
 * returns decrypted data
 * @param {ApplicationLossPayeeFinancialInternational} applicationFinancialInternational: financialInternational data from application
 * @returns {ApplicationLossPayeeFinancialInternational} decrypted iban and bicSwiftCode in financialInternational section
 */
const decryptFinancialInternational = (applicationFinancialInternational: ApplicationLossPayeeFinancialInternational) => {
  const updatedFinancialInternational = applicationFinancialInternational;

  const { iban, ibanVector, bicSwiftCode, bicSwiftCodeVector } = updatedFinancialInternational;

  let decryptedIban = '';
  let decryptedBicSwiftCode = '';

  // decrypts iban using encrypted "value" and initialisation vector if both iban and ibanVector are defined
  if (iban && ibanVector) {
    decryptedIban = decryptData.decrypt({ value: iban, iv: ibanVector });
  }

  // decrypts bicSwiftCode using encrypted "value" and initialisation vector if both bicSwiftCode and bicSwiftCodeVector are defined
  if (bicSwiftCode && bicSwiftCodeVector) {
    decryptedBicSwiftCode = decryptData.decrypt({ value: bicSwiftCode, iv: bicSwiftCodeVector });
  }

  // updates financialInternational data with decrypted data
  updatedFinancialInternational.iban = decryptedIban;
  updatedFinancialInternational.bicSwiftCode = decryptedBicSwiftCode;

  return updatedFinancialInternational;
};

export default decryptFinancialInternational;

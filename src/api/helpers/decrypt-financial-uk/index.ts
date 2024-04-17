import { ApplicationFinancialUk } from '../../types';
import decrypt from '../decrypt';

/**
 * decryptFinancialUk
 * decrypts the accountNumber and sortCode in the financialUk section of application
 * returns decrypted data
 * @param {ApplicationFinancialUk} applicationFinancialUk: financialUk data from application
 * @returns {ApplicationFinancialUk} decrypted accountNumber and sortCode in financialUk section
 */
const decryptFinancialUk = (applicationFinancialUk: ApplicationFinancialUk) => {
  const updatedFinancialUk = applicationFinancialUk;

  const { accountNumber, accountNumberVector, sortCode, sortCodeVector } = updatedFinancialUk;

  // decrypts account number and sort code using encrypted "value" and initialisation vector
  const decryptedAccountNumber = decrypt.decrypt({ value: accountNumber, iv: accountNumberVector });
  const decryptedSortCode = decrypt.decrypt({ value: sortCode, iv: sortCodeVector });

  // updates financialUk data with decrypted data
  updatedFinancialUk.accountNumber = decryptedAccountNumber;
  updatedFinancialUk.sortCode = decryptedSortCode;

  return updatedFinancialUk;
};

export default decryptFinancialUk;

import { ApplicationLossPayeeFinancialUk } from '../../types';
import decryptData from '../decrypt';

/**
 * decryptFinancialUk
 * decrypts the accountNumber and sortCode in the financialUk section of application
 * returns decrypted data
 * @param {ApplicationLossPayeeFinancialUk} applicationFinancialUk: financialUk data from application
 * @returns {ApplicationLossPayeeFinancialUk} decrypted accountNumber and sortCode in financialUk section
 */
const decryptFinancialUk = (applicationFinancialUk: ApplicationLossPayeeFinancialUk) => {
  try {
    const updatedFinancialUk = applicationFinancialUk;

    const { accountNumber, accountNumberVector, sortCode, sortCodeVector } = updatedFinancialUk;

    let decryptedAccountNumber = '';
    let decryptedSortCode = '';

    /**
     * If both accountNumber and accountNumberVector are defined,
     * decrypt accountNumber using encrypted "value" and initialisation vector
     */
    if (accountNumber && accountNumberVector) {
      decryptedAccountNumber = decryptData.decrypt({ value: accountNumber, iv: accountNumberVector });
    }

    /**
     * If both sortCode and sortCodeVector are defined,
     * decrypt sortCode using encrypted "value" and initialisation vector
     */
    if (sortCode && sortCodeVector) {
      decryptedSortCode = decryptData.decrypt({ value: sortCode, iv: sortCodeVector });
    }

    // updates financialUk data with decrypted data
    updatedFinancialUk.accountNumber = decryptedAccountNumber;
    updatedFinancialUk.sortCode = decryptedSortCode;

    return updatedFinancialUk;
  } catch (err) {
    console.error('Error decrypting financial uk %O', err);
    throw new Error(`Error decrypting financial uk ${err}`);
  }
};

export default decryptFinancialUk;

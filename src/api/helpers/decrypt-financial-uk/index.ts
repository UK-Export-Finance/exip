import decryptData from '../decrypt';
import { ApplicationLossPayeeFinancialUk } from '../../types';

/**
 * decryptFinancialUk
 * decrypts the accountNumber and sortCode in the financialUk section of application
 * returns decrypted data
 * @param {ApplicationLossPayeeFinancialUk} applicationFinancialUk: financialUk data from application
 * @returns {ApplicationLossPayeeFinancialUk} decrypted accountNumber and sortCode in financialUk section
 */
const decryptFinancialUk = (applicationFinancialUk: ApplicationLossPayeeFinancialUk) => {
  try {
    console.info('Decrypting financial uk');

    const mapped = applicationFinancialUk;

    const {
      accountNumber,
      sortCode,
      vector: { accountNumberVector, sortCodeVector },
    } = applicationFinancialUk;

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

    mapped.accountNumber = decryptedAccountNumber;
    mapped.sortCode = decryptedSortCode;

    return mapped;
  } catch (error) {
    console.error('Error decrypting financial uk %o', error);

    throw new Error(`Error decrypting financial uk ${error}`);
  }
};

export default decryptFinancialUk;

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
    console.info('Decrypting financial uk');

    const mapped = applicationFinancialUk;

    const {
      accountNumber,
      sortCode,
      vector: { accountNumberVector, sortCodeVector },
    } = mapped;

    let decryptedAccountNumber;
    let decryptedSortCode;

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
  } catch (err) {
    console.error('Error decrypting financial uk %O', err);
    throw new Error(`Error decrypting financial uk ${err}`);
  }
};

export default decryptFinancialUk;

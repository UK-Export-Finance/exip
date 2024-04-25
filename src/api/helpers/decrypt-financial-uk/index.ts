import { ApplicationFinancialUk } from '../../types';
import decryptData from '../decrypt';

/**
 * decryptFinancialUk
 * decrypts the accountNumber and sortCode in the financialUk section of application
 * returns decrypted data
 * @param {ApplicationFinancialUk} applicationFinancialUk: financialUk data from application
 * @returns {ApplicationFinancialUk} decrypted accountNumber and sortCode in financialUk section
 */
const decryptFinancialUk = (applicationFinancialUk: ApplicationFinancialUk) => {
  try {
    console.info('Decrypting accountNumber and sortCode for financialUk');

    const updatedFinancialUk = applicationFinancialUk;

    const { accountNumber, accountNumberVector, sortCode, sortCodeVector } = updatedFinancialUk;

    let decryptedAccountNumber = '';
    let decryptedSortCode = '';

    // decrypts accountNumber using encrypted "value" and initialisation vector if both accountNumber and accountNumberVector are defined
    if (accountNumber && accountNumberVector) {
      decryptedAccountNumber = decryptData.decrypt({ value: accountNumber, iv: accountNumberVector });
    }

    // decrypts sortCode using encrypted "value" and initialisation vector if both sortCode and sortCodeVector are defined
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

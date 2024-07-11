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
  try {
    console.info('Decrypting financial international');

    const mapped = applicationFinancialInternational;

    const {
      bicSwiftCode,
      iban,
      vector: { bicSwiftCodeVector, ibanVector },
    } = applicationFinancialInternational;

    let decryptedIban = '';
    let decryptedBicSwiftCode = '';

    /**
     * If both bicSwiftCode and bicSwiftCodeVector are defined,
     * decrypt bicSwiftCode using encrypted "value" and initialisation vector
     */
    if (bicSwiftCode && bicSwiftCodeVector) {
      decryptedBicSwiftCode = decryptData.decrypt({ value: bicSwiftCode, iv: bicSwiftCodeVector });
    }

    /**
     * If both iban and ibanVector are defined,
     * decrypt iban using encrypted "value" and initialisation vector
     */
    if (iban && ibanVector) {
      decryptedIban = decryptData.decrypt({ value: iban, iv: ibanVector });
    }

    mapped.bicSwiftCode = decryptedBicSwiftCode;
    mapped.iban = decryptedIban;

    return mapped;
  } catch (err) {
    console.error('Error decrypting international uk %O', err);
    throw new Error(`Error decrypting international uk ${err}`);
  }
};

export default decryptFinancialInternational;

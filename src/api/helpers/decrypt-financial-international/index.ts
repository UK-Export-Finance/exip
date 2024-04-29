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
      iban,
      bicSwiftCode,
      vector: { ibanVector, bicSwiftCodeVector },
    } = mapped;

    let decryptedIban;
    let decryptedBicSwiftCode;

    /**
     * If both iban and ibanVector are defined,
     * decrypt iban using encrypted "value" and initialisation vector
     */
    if (iban && ibanVector) {
      decryptedIban = decryptData.decrypt({ value: iban, iv: ibanVector });
    }

    /**
     * If both bicSwiftCode and bicSwiftCodeVector are defined,
     * decrypt bicSwiftCode using encrypted "value" and initialisation vector
     */
    if (bicSwiftCode && bicSwiftCodeVector) {
      decryptedBicSwiftCode = decryptData.decrypt({ value: bicSwiftCode, iv: bicSwiftCodeVector });
    }
    mapped.iban = decryptedIban;
    mapped.bicSwiftCode = decryptedBicSwiftCode;

    return mapped;
  } catch (err) {
    console.error('Error decrypting international uk %O', err);
    throw new Error(`Error decrypting international uk ${err}`);
  }
};

export default decryptFinancialInternational;

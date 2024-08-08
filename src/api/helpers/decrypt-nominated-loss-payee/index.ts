import { ApplicationNominatedLossPayee } from '../../types';
import decryptFinancialUkData from '../decrypt-financial-uk';
import decryptFinancialInternationalData from '../decrypt-financial-international';

/**
 * decryptNominatedLossPayee
 * decrypts nominatedLossPayee based on passed variable
 * if decryptFinancialUk - decrypts accountNumber and sortCode
 * returns nominatedLossPayee with decrypted data
 * @param {ApplicationNominatedLossPayee} nominatedLossPayee
 * @param {Boolean} decryptFinancialUk: should financialUk data be decrypted
 * @param {Boolean} decryptFinancialInternational: should financialInternational data be decrypted
 * @returns {ApplicationNominatedLossPayee} decrypted nominatedLossPayee
 */
const decryptNominatedLossPayee = (
  nominatedLossPayee: ApplicationNominatedLossPayee,
  decryptFinancialUk?: boolean,
  decryptFinancialInternational?: boolean,
) => {
  try {
    console.info('Decrypting nominated loss payee %s', nominatedLossPayee.id);

    const mapped = {
      ...nominatedLossPayee,
      financialUk: {},
      financialInternational: {},
    };

    const { financialUk, financialInternational } = nominatedLossPayee;

    /**
     * if decryptFinancialUk - decrypt accountNumber and sortCode in decryptFinancialUkData
     * add to decrypted data mapping
     */
    if (decryptFinancialUk) {
      console.info('Decrypting nominated loss payee - financial - UK data %s', nominatedLossPayee.id);

      const mappedFinancialUk = decryptFinancialUkData(financialUk);

      mapped.financialUk = mappedFinancialUk;
    }

    /**
     * if decryptFinancialInternational - decrypt iban and bicSwiftCode in decryptFinancialInternationalData
     * add to decrypted data mapping
     */
    if (decryptFinancialInternational) {
      console.info('Decrypting nominated loss payee - financial - international data %s', nominatedLossPayee.id);

      const mappedFinancialInternational = decryptFinancialInternationalData(financialInternational);

      mapped.financialInternational = mappedFinancialInternational;
    }

    return mapped;
  } catch (error) {
    console.error('Error decrypting nominated loss payee %O', error);

    throw new Error(`Error decrypting nominated loss payee ${error}`);
  }
};

export default decryptNominatedLossPayee;

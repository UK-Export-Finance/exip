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
    let updatedNominatedLossPayee = nominatedLossPayee;

    const { financialUk, financialInternational } = updatedNominatedLossPayee;

    /**
     * if decryptFinancialUk - decrypt accountNumber and sortCode in decryptFinancialUkData
     * update updatedApplication with decrypted data
     */
    if (decryptFinancialUk) {
      const updatedFinancialUk = decryptFinancialUkData(financialUk);

      updatedNominatedLossPayee = {
        ...updatedNominatedLossPayee,
        financialUk: updatedFinancialUk,
      };
    }

    /**
     * if decryptFinancialInternational - decrypt iban and bicSwiftCode in decryptFinancialInternationalData
     * update updatedApplication with decrypted data
     */
    if (decryptFinancialInternational) {
      const updatedFinancialInternational = decryptFinancialInternationalData(financialInternational);

      updatedNominatedLossPayee = {
        ...updatedNominatedLossPayee,
        financialInternational: updatedFinancialInternational,
      };
    }

    return updatedNominatedLossPayee;
  } catch (err) {
    console.error('Error decrypting nominated loss payee %O', err);
    throw new Error(`Error decrypting nominated loss payee ${err}`);
  }
};

export default decryptNominatedLossPayee;

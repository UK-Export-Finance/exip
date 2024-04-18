import { ApplicationNominatedLossPayee } from '../../types';
import decryptFinancialUkData from '../decrypt-financial-uk';

/**
 * decryptNominatedLossPayee
 * decrypts nominatedLossPayee based on passed variable
 * if decryptFinancialUk - decrypts accountNumber and sortCode
 * returns nominatedLossPayee with decrypted data
 * @param {ApplicationNominatedLossPayee} nominatedLossPayee
 * @param {Boolean} decryptFinancialUk: should financialUk data be decrypted
 * @returns {ApplicationNominatedLossPayee} decrypted nominatedLossPayee
 */
const decryptNominatedLossPayee = (nominatedLossPayee: ApplicationNominatedLossPayee, decryptFinancialUk?: boolean) => {
  let updatedNominatedLossPayee = nominatedLossPayee;

  const { financialUk } = updatedNominatedLossPayee;

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

  return updatedNominatedLossPayee;
};

export default decryptNominatedLossPayee;

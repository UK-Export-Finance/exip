import { Application } from '../../types';
import decryptFinancialUkData from '../decrypt-financial-uk';

/**
 * decryptApplication
 * decrypts sections of application based on passed variable
 * if decryptFinancialUk - decrypts accountNumber and sortCode
 * returns application with decrypted data
 * @param {Application} application
 * @param {Boolean} decryptFinancialUk: should financialUk data be decrypted
 * @returns {Application} decrypted application
 */
const decryptApplication = (application: Application, decryptFinancialUk?: boolean) => {
  const updatedApplication = application;

  const {
    nominatedLossPayee: { financialUk },
  } = updatedApplication;

  /**
   * if decryptFinancialUk - decrypt accountNumber and sortCode in decryptFinancialUkData
   * update updatedApplication with decrypted data
   */
  if (decryptFinancialUk) {
    const updatedFinancialUk = decryptFinancialUkData(financialUk);

    updatedApplication.nominatedLossPayee.financialUk.accountNumber = updatedFinancialUk.accountNumber;
    updatedApplication.nominatedLossPayee.financialUk.sortCode = updatedFinancialUk.sortCode;
  }

  return updatedApplication;
};

export default decryptApplication;

import { POLICY } from '../../constants/routes/insurance/policy';

const { CHECK_YOUR_ANSWERS, LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT } = POLICY;

/**
 * getApplicationByReferenceNumberVariables
 * generates variables for getApplicationByReferenceNumber
 * @param {String} referenceNumber
 * @param {String} url of the page
 * @returns {ApplicationByReferenceNumberVariables} variables in correct format
 */
const getApplicationByReferenceNumberVariables = (referenceNumber: string, url: string) => {
  let decryptFinancialUk;
  let decryptFinancialInternational;

  /**
   * if url includes LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT
   * then decryptFinancialUk should be set to true
   */
  if (url.includes(LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT) || url.includes(CHECK_YOUR_ANSWERS)) {
    decryptFinancialUk = true;
  }

  /**
   * if url includes LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT
   * then decryptFinancialInternational should be set to true
   */
  if (url.includes(LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT) || url.includes(CHECK_YOUR_ANSWERS)) {
    decryptFinancialInternational = true;
  }

  return {
    referenceNumber: Number(referenceNumber),
    decryptFinancialUk,
    decryptFinancialInternational,
  };
};

export default getApplicationByReferenceNumberVariables;

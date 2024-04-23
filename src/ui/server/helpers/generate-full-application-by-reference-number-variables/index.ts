import LOSS_PAYEE_ROUTES from '../../constants/routes/insurance/policy/loss-payee';

const { LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT } = LOSS_PAYEE_ROUTES;

/**
 * generateFullApplicationByReferenceNumberVariables
 * generates variables for getApplicationByReferenceNumber
 * @param {String} referenceNumber
 * @param {String} url of the page
 * @returns {ApplicationByReferenceNumberVariables} variables in correct format
 */
const generateFullApplicationByReferenceNumberVariables = (referenceNumber: string, url: string) => {
  let decryptFinancialUk;
  let decryptFinancialInternational;

  /**
   * if url includes LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT
   * then decryptFinancialUk should be set to true
   */
  if (url.includes(LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT)) {
    decryptFinancialUk = true;
  }

  /**
   * if url includes LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT
   * then decryptFinancialInternational should be set to true
   */
  if (url.includes(LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT)) {
    decryptFinancialInternational = true;
  }

  return {
    referenceNumber: Number(referenceNumber),
    decryptFinancialUk,
    decryptFinancialInternational,
  };
};

export default generateFullApplicationByReferenceNumberVariables;

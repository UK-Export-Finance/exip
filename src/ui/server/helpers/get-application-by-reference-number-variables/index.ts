import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const {
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
  POLICY: {
    CHECK_YOUR_ANSWERS, LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT
  },
} = INSURANCE_ROUTES;

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
   * if url includes LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
   * set decryptFinancialUk to true.
   */
  if (url.includes(LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT)) {
    decryptFinancialUk = true;
  }

  /**
   * if url includes LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
   * set decryptFinancialInternational to to true.
   */
  if (url.includes(LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT)) {
    decryptFinancialInternational = true;
  }

  /**
   * if url includes CHECK_YOUR_ANSWERS or TYPE_OF_POLICY
   * set decryptFinancialUk and decryptFinancialInternational to true.
   * Although the data would only have either UK or international data;
   * At this stage, it is not possible to determine which piece of data is available,
   * because we do not have the application data available.
   */
  if (url.includes(CHECK_YOUR_ANSWERS) || url.includes(TYPE_OF_POLICY)) {
    decryptFinancialUk = true;
    decryptFinancialInternational = true;
  }

  return {
    referenceNumber: Number(referenceNumber),
    decryptFinancialUk,
    decryptFinancialInternational,
  };
};

export default getApplicationByReferenceNumberVariables;

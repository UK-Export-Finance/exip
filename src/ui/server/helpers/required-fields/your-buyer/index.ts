import YOUR_BUYER_FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = YOUR_BUYER_FIELD_IDS.COMPANY_OR_ORGANISATION;
const {
  CONNECTION_WITH_BUYER_DESCRIPTION,
  CONNECTION_WITH_BUYER,
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  FAILED_PAYMENTS,
  HAS_BUYER_FINANCIAL_ACCOUNTS,
} = YOUR_BUYER_FIELD_IDS;

/**
 * workingWithBuyerTasks
 * Get working with buyer tasks depending on the connectionWithBuyer field
 * if connectionWithBuyer is true,
 * then returns CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER (yes no radios and description field)
 * else returns CONNECTION_WITH_BUYER, TRADED_WITH_BUYER (yes no radios)
 * @param {Boolean} connectionWithBuyer
 * @returns {Array<String>} Array of fieldIds
 */
export const workingWithBuyerTasks = ({ connectionWithBuyer }: { connectionWithBuyer?: boolean }): Array<string> => {
  if (connectionWithBuyer) {
    return [CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];
  }

  return [CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];
};

/**
 * tradingHistoryTasks
 * returns fieldIds for trading history
 * if tradedWithBuyer and outstandingPayments is true,
 * then returns OUTSTANDING_PAYMENTS and TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS, FAILED_PAYMENTS (yes no radios and value inputs)
 * if tradedWithBuyer is true but outstandingPayments is false,
 * then returns OUTSTANDING_PAYMENTS and FAILED_PAYMENTS (yes no radios)
 * if none are true, then returns an empty array as page will not be rendered
 * @param {Boolean} tradedWithBuyer
 * @param {Boolean} outstandingPayments
 * @returns {Array<String>} fieldIds
 */
export const tradingHistoryTasks = ({ tradedWithBuyer, outstandingPayments }: { tradedWithBuyer?: boolean; outstandingPayments?: boolean }): Array<string> => {
  if (tradedWithBuyer) {
    if (outstandingPayments) {
      return [OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS, FAILED_PAYMENTS];
    }

    return [OUTSTANDING_PAYMENTS, FAILED_PAYMENTS];
  }

  return [];
};

/**
 * creditInsuranceCoverTasks
 * returns fieldIds for credit insurance cover
 * if totalContractValueOverThreshold and hasPreviousCreditInsuranceWithBuyer is true,
 * then returns HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER and PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER (yes no radio and description)
 * if totalContractValueOverThreshold is true but hasPreviousCreditInsuranceWithBuyer is false,
 * then returns HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER (yes no radio)
 * if none are true, then returns an empty array
 * @param {Boolean} totalContractValueOverThreshold
 * @param {Boolean} hasPreviousCreditInsuranceWithBuyer
 * @returns {Array<String>} fieldIds
 */
export const creditInsuranceCoverTasks = ({
  totalContractValueOverThreshold,
  hasPreviousCreditInsuranceWithBuyer,
}: {
  totalContractValueOverThreshold?: boolean;
  hasPreviousCreditInsuranceWithBuyer?: boolean;
}): Array<string> => {
  if (totalContractValueOverThreshold && !hasPreviousCreditInsuranceWithBuyer) {
    return [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];
  }

  if (totalContractValueOverThreshold && hasPreviousCreditInsuranceWithBuyer) {
    return [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];
  }

  return [];
};

/**
 * requiredFields
 * Required fields for the insurance - your buyer section
 * @param {Boolean} connectionWithBuyer
 * @param {Boolean} tradedWithBuyer
 * @param {Boolean} outstandingPayments
 * @param {Boolean} hasPreviousCreditInsuranceWithBuyer
 * @param {Boolean} totalContractValueOverThreshold
 * @returns {Array} Required field IDs
 */
const requiredFields = ({
  connectionWithBuyer,
  tradedWithBuyer,
  outstandingPayments,
  hasPreviousCreditInsuranceWithBuyer,
  totalContractValueOverThreshold,
}: {
  connectionWithBuyer?: boolean;
  tradedWithBuyer?: boolean;
  outstandingPayments?: boolean;
  hasPreviousCreditInsuranceWithBuyer?: boolean;
  totalContractValueOverThreshold?: boolean;
}): Array<string> =>
  [
    ...Object.values({ ...COMPANY_OR_ORGANISATION_FIELDS }),
    ...workingWithBuyerTasks({ connectionWithBuyer }),
    ...tradingHistoryTasks({ tradedWithBuyer, outstandingPayments }),
    ...creditInsuranceCoverTasks({ totalContractValueOverThreshold, hasPreviousCreditInsuranceWithBuyer }),
    HAS_BUYER_FINANCIAL_ACCOUNTS,
  ] as Array<string>;

export default requiredFields;

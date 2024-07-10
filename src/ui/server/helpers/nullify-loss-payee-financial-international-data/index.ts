import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

/**
 * nullifyLossPayeeFinancialInternationalData
 * Create an object with empty LOSS_PAYEE_FINANCIAL_INTERNATIONAL fields.
 * @returns {ApplicationLossPayeeFinancialDetailsInternational}
 */
const nullifyLossPayeeFinancialInternationalData = () => ({
  [BIC_SWIFT_CODE]: '',
  [IBAN]: '',
  [FINANCIAL_ADDRESS]: '',
});

export default nullifyLossPayeeFinancialInternationalData;

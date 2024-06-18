import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

/**
 * nullifyLossPayeeFinancialUkData
 * Create an object with empty LOSS_PAYEE_FINANCIAL_UK fields.
 * @returns {ApplicationLossPayeeFinancialDetailsUk}
 */
const nullifyLossPayeeFinancialUkData = () => ({
  [ACCOUNT_NUMBER]: '',
  [SORT_CODE]: '',
  [FINANCIAL_ADDRESS]: '',
});

export default nullifyLossPayeeFinancialUkData;

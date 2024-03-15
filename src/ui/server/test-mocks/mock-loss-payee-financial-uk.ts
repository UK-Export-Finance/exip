import POLICY_FIELD_IDS from '../constants/field-ids/insurance/policy';

const { ACCOUNT_NUMBER, SORT_CODE } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const mockLossPayeeFinancialUk = {
  [ACCOUNT_NUMBER]: '123456',
  [SORT_CODE]: '123456',
  [FINANCIAL_ADDRESS]: 'mock address',
};

export default mockLossPayeeFinancialUk;

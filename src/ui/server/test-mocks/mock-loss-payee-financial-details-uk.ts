import POLICY_FIELD_IDS from '../constants/field-ids/insurance/policy';

const { ACCOUNT_NUMBER, SORT_CODE } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const mockLossPayeeFinancialDetailsUk = {
  [ACCOUNT_NUMBER]: '123456',
  [SORT_CODE]: '123456',
  [FINANCIAL_ADDRESS]: 'Mock UK financial address',
};

export default mockLossPayeeFinancialDetailsUk;

import POLICY_FIELD_IDS from '../constants/field-ids/insurance/policy';

const { ACCOUNT_NUMBER, SORT_CODE } = POLICY_FIELD_IDS.LOSS_PAYEE_UK_BANK_DETAILS;
const { BANK_ADDRESS } = POLICY_FIELD_IDS;

const mockLossPayeeBankDetails = {
  [ACCOUNT_NUMBER]: '123456',
  [SORT_CODE]: '123456',
  [BANK_ADDRESS]: 'mock address',
};

export default mockLossPayeeBankDetails;

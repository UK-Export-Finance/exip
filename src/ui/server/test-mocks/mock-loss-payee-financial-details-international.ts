import POLICY_FIELD_IDS from '../constants/field-ids/insurance/policy';

const { BIC_SWIFT_CODE, IBAN } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const mockLossPayeeFinancialDetailsInternational = {
  [BIC_SWIFT_CODE]: 'BKENGB2L123',
  [IBAN]: '1234567890123456',
  [FINANCIAL_ADDRESS]: 'mock address',
};

export default mockLossPayeeFinancialDetailsInternational;

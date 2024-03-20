import POLICY_FIELD_IDS from '../constants/field-ids/insurance/policy';

const { BIC_SWIFT_CODE, IBAN } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const mockLossPayeeFinancialDetailsInternational = {
  [BIC_SWIFT_CODE]: 'BKENGB2L123',
  [IBAN]: 'GB33BUKB20201555555555',
  [FINANCIAL_ADDRESS]: 'Mock international financial address',
};

export default mockLossPayeeFinancialDetailsInternational;

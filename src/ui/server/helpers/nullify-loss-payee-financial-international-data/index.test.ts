import nullifyLossPayeeFinancialInternationalData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

describe('server/helpers/nullify-loss-payee-financial-international-data', () => {
  it('should return an object with empty fields', () => {
    const result = nullifyLossPayeeFinancialInternationalData();

    const expected = {
      [BIC_SWIFT_CODE]: '',
      [IBAN]: '',
      [FINANCIAL_ADDRESS]: '',
    };

    expect(result).toEqual(expected);
  });
});

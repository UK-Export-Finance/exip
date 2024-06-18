import nullifyLossPayeeFinancialUkData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

describe('server/helpers/nullify-loss-payee-financial-uk-data', () => {
  it('should return an object with empty fields', () => {
    const result = nullifyLossPayeeFinancialUkData();

    const expected = {
      [ACCOUNT_NUMBER]: '',
      [SORT_CODE]: '',
      [FINANCIAL_ADDRESS]: '',
    };

    expect(result).toEqual(expected);
  });
});

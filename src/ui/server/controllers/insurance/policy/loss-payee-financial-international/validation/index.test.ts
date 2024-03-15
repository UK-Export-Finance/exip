import validation from '.';
import validationRules from './rules';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER },
} = FIELD_IDS;

describe('controllers/insurance/policy/loss-payee-financial-details-international/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [ACCOUNT_NUMBER]: '',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

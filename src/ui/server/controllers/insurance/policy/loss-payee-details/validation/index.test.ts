import validation from '.';
import validationRules from './rules';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  LOSS_PAYEE_DETAILS: { NAME },
} = FIELD_IDS;

describe('controllers/insurance/policy/loss-payee-details/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [NAME]: '',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

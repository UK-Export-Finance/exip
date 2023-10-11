import validation from '.';
import validationRules from './rules';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy-and-exports';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  DIFFERENT_NAME_ON_POLICY: { POSITION },
} = FIELD_IDS;

describe('controllers/insurance/policy-and-exports/different-name-on-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [POSITION]: '',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

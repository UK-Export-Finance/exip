import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../constants';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  FEEDBACK: { IMPROVEMENT },
} = FIELD_IDS;

describe('controllers/insurance/feedback/feedback-form/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [IMPROVEMENT]: 'a'.repeat(1500),
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

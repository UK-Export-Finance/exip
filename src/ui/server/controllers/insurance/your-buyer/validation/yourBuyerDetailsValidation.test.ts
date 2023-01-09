import yourBuyerDetailsValidation from './yourBuyerDetailsValidation';
import validationRules from './rules/rules';
import combineValidationRules from '../../../../helpers/combine-validation-rules';

describe('controllers/insurance/your-buyer/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = yourBuyerDetailsValidation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

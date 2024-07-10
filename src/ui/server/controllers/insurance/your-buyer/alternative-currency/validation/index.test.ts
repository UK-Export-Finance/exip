import alternativeCurrencyValidation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

describe('controllers/insurance/your-buyer/alternative-currency/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = alternativeCurrencyValidation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

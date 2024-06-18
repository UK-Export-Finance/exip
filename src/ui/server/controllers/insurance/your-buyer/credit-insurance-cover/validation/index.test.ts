import creditInsuranceCoverValidation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

describe('controllers/insurance/your-buyer/credit-insurance-cover/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = creditInsuranceCoverValidation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

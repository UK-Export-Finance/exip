import buyerFinancialInformationValidation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

describe('controllers/insurance/your-buyer/buyer-financial-information/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = buyerFinancialInformationValidation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

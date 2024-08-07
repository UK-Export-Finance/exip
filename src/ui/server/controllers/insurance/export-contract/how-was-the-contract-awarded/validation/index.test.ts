import howWasTheContractAwardedValidation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

describe('controllers/insurance/export-contract/how-was-the-contract-awarded/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = howWasTheContractAwardedValidation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

import connectionToTheBuyerValidation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

describe('controllers/insurance/your-buyer/failed-to-pay-on-time/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {};

    const result = connectionToTheBuyerValidation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

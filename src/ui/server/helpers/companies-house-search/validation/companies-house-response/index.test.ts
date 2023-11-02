import validation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../combine-validation-rules';
import { CompaniesHouseResponse } from '../../../../../types';

describe('controllers/insurance/business/companies-house-number/validation/companies-house-response', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      success: false,
      apiError: true,
    } as CompaniesHouseResponse;

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

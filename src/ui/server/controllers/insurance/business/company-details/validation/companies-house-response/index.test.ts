import validation from '.';
import validationRules from './rules';
import { CompanyHouseResponse } from '../../../../../../../types';

describe('controllers/insurance/business/company-details/validation/companies-house-response', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {
      success: false,
      apiError: true,
    } as CompanyHouseResponse;

    const result = validation(mockSubmittedData);

    let expectedErrorsObj!: object;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockSubmittedData, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});

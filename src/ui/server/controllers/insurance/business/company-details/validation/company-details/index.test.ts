import validation from '.';
import validationRules from './rules';
import { RequestBody } from '../../../../../../../types';

describe('controllers/insurance/business/company-details/validation/company-details', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {} as RequestBody;

    const result = validation(mockSubmittedData, {});

    let expectedErrorsObj!: object;

    validationRules.forEach((rule) => {
      expectedErrorsObj = rule(mockSubmittedData, expectedErrorsObj);
    });

    expect(result).toEqual(expectedErrorsObj);
  });
});

import validation from '.';
import validationRules from './rules';

describe('controllers/insurance/policy-and-export/single-contract-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {};

    const result = validation(mockSubmittedData);

    let expectedErrorsObj!: object;

    validationRules.forEach((rule) => {
      expectedErrorsObj = rule(mockSubmittedData, expectedErrorsObj);
    });

    expect(result).toEqual(expectedErrorsObj);
  });
});

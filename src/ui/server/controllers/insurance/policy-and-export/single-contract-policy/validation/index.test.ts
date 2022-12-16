import validation from '.';
import validationRules from './rules';

describe('controllers/insurance/policy-and-export/single-contract-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {};

    const result = validation(mockSubmittedData);

    let expectedErrorsObj!: object;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockSubmittedData, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});

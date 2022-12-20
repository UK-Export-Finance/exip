import validation from '.';
import validationRules from './rules';

describe('controllers/quote/policy-type/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockBody = {};

    const result = validation(mockBody);

    let expectedErrorsObj!: object;

    validationRules.forEach((rule) => {
      expectedErrorsObj = rule(mockBody, expectedErrorsObj);
    });

    expect(result).toEqual(expectedErrorsObj);
  });
});

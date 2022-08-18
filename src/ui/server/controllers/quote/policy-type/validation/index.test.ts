import validation from '.';
import validationRules from './rules';

describe('controllers/policy-type/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockBody = {};

    const result = validation(mockBody);

    let expectedErrorsObj!: object;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockBody, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});

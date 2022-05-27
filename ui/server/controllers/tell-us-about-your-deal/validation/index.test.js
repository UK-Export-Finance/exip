const validation = require('.');
const validationRules = require('./rules');

describe('controllers/tell-us-about-your-deal/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockBody = {};

    const result = validation(mockBody);

    let expectedErrorsObj;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockBody, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});

const validation = require('.');
const validationRules = require('./rules');
const { FIELD_IDS, FIELD_VALUES } = require('../../../constants');

describe('controllers/tell-us-about-your-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {
      [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    };

    const result = validation(mockSubmittedData);

    let expectedErrorsObj;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockSubmittedData, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});

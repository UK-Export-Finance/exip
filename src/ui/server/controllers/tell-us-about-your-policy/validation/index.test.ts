import validation from '.';
import validationRules from './rules';
import { FIELD_IDS, FIELD_VALUES } from '../../../constants';

describe('controllers/tell-us-about-your-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {
      [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    };

    const result = validation(mockSubmittedData);

    let expectedErrorsObj!: object;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockSubmittedData, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});

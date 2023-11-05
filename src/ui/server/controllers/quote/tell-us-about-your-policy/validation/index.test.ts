import validation from '.';
import validationRules from './rules';
import combineValidationRules from '../../../../helpers/combine-validation-rules';
import { FIELD_IDS, FIELD_VALUES } from '../../../../constants';

describe('controllers/quote/tell-us-about-your-policy/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});

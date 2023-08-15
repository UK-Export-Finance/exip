import rule from './policy-type';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';

const { POLICY_TYPE: FIELD_ID } = FIELD_IDS;
const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

describe('controllers/quote/policy-type/validation/rules/policy-type', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = rule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE, mockErrors);

    expect(result).toEqual(expected);
  });
});

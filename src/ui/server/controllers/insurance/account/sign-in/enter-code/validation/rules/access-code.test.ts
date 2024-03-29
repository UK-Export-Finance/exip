import accessCodeRules from './access-code';
import { FIELD_IDS } from '../../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: { ACCESS_CODE: FIELD_ID },
  },
} = FIELD_IDS;

const {
  ACCOUNT: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/sign-in/enter-code/validation/rules/access-code', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = accessCodeRules(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.INCORRECT, mockErrors);

    expect(result).toEqual(expected);
  });
});

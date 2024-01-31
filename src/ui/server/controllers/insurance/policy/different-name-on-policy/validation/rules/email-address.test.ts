import emailAddress from './email-address';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import emailValidation from '../../../../../../shared-validation/email';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

describe('controllers/insurance/policy/different-name-on-policy/validation/rules/email-address', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of emailValidation', () => {
    const result = emailAddress(mockBody, mockErrors);

    const expected = emailValidation(FIELD_ID, mockBody[FIELD_ID], errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });
});

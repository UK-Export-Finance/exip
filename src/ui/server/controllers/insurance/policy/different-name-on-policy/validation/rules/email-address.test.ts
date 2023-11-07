import emailAddress from './email-address';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

describe('controllers/insurance/policy/different-name-on-policy/validation/rules/email-address', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of emailValidation', () => {
    const response = emailAddress(mockBody, mockErrors);

    const expected = emailValidation(FIELD_ID, mockBody[FIELD_ID], errorMessage, mockErrors);

    expect(response).toEqual(expected);
  });
});

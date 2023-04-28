import emailAddress from './email-address';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[FIELD_ID];

const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

describe('controllers/insurance/business/contact/validation/rules/email-address', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation', () => {
    const response = emailAddress(mockBody, mockErrors);

    const expected = emailValidation(FIELD_ID, mockBody[FIELD_ID], errorMessage, mockErrors);

    expect(response).toEqual(expected);
  });
});

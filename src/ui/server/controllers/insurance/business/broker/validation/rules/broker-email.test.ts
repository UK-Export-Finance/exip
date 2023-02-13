import brokerEmail from './broker-email';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import emailValidation from '../../../../../../shared-validation/email';

const {
  BROKER: { EMAIL, USING_BROKER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[EMAIL];

describe('controllers/insurance/business/broker/validation/rules/broker-email', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [EMAIL]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation if using broker is "Yes" and email is empty', () => {
    mockBody[USING_BROKER] = 'Yes';

    const response = brokerEmail(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, EMAIL, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it('should return the result of emailValidation if using broker is "Yes" and email is the incorrect format', () => {
    mockBody[USING_BROKER] = 'Yes';
    mockBody[EMAIL] = 'aaa.com';

    const response = brokerEmail(mockBody, mockErrors);

    const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

    expect(response).toEqual(expected);
  });

  it('should return the mockErrors if using broker is "Yes" and email is valid', () => {
    mockBody[USING_BROKER] = 'Yes';
    mockBody[EMAIL] = 'test@test.com';

    const response = brokerEmail(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "No"', () => {
    mockBody[USING_BROKER] = 'No';

    const response = brokerEmail(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "null"', () => {
    mockBody[USING_BROKER] = null;

    const response = brokerEmail(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});

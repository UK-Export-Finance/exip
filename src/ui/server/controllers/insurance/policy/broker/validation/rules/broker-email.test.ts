import dotenv from 'dotenv';
import brokerEmail from './broker-email';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

dotenv.config();

const {
  BROKER: { EMAIL, USING_BROKER },
} = FIELD_IDS;

const { POLICY } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = POLICY[EMAIL];

describe('controllers/insurance/policy/broker/validation/rules/broker-email', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [EMAIL]: '',
  } as RequestBody;

  describe('when using broker is true', () => {
    describe('if email is empty', () => {
      it('should return the result of emailValidation', () => {
        mockBody[USING_BROKER] = true;

        const response = brokerEmail(mockBody, mockErrors);

        const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

        expect(response).toEqual(expected);
      });
    });

    describe('if email is the incorrect format', () => {
      it('should return the result of emailValidation', () => {
        mockBody[USING_BROKER] = true;
        mockBody[EMAIL] = 'aaa.com';

        const response = brokerEmail(mockBody, mockErrors);

        const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

        expect(response).toEqual(expected);
      });
    });

    describe('if email is valid', () => {
      it('should return the provided errors object', () => {
        mockBody[USING_BROKER] = true;
        mockBody[EMAIL] = process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1;

        const response = brokerEmail(mockBody, mockErrors);

        expect(response).toEqual(mockErrors);
      });
    });
  });

  describe('if using broker is false', () => {
    it('should return the provided errors object"', () => {
      mockBody[USING_BROKER] = false;

      const response = brokerEmail(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });

  describe('if using broker is "null"', () => {
    it('should return the provided errors object', () => {
      mockBody[USING_BROKER] = null;

      const response = brokerEmail(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

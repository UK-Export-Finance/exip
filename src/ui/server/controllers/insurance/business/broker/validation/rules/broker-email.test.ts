import dotenv from 'dotenv';
import brokerEmail from './broker-email';
import { FIELD_VALUES } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import emailValidation from '../../../../../../shared-validation/email';

dotenv.config();

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

  describe(`when using broker is "${FIELD_VALUES.YES}"`, () => {
    describe('if email is empty', () => {
      it('should return the result of emailValidation', () => {
        mockBody[USING_BROKER] = FIELD_VALUES.YES;

        const response = brokerEmail(mockBody, mockErrors);

        const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

        expect(response).toEqual(expected);
      });
    });

    describe('if email is the incorrect format', () => {
      it('should return the result of emailValidation', () => {
        mockBody[USING_BROKER] = FIELD_VALUES.YES;
        mockBody[EMAIL] = 'aaa.com';

        const response = brokerEmail(mockBody, mockErrors);

        const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

        expect(response).toEqual(expected);
      });
    });

    describe('if email is valid', () => {
      it('should return the provided errors object', () => {
        mockBody[USING_BROKER] = FIELD_VALUES.YES;
        mockBody[EMAIL] = process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1;

        const response = brokerEmail(mockBody, mockErrors);

        expect(response).toEqual(mockErrors);
      });
    });
  });

  describe(`if using broker is "${FIELD_VALUES.NO}"`, () => {
    it('should return the provided errors object"', () => {
      mockBody[USING_BROKER] = FIELD_VALUES.NO;

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

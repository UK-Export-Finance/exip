import brokerEmail from './broker-email';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
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

  describe('when using broker is "Yes"', () => {
    describe('if email is empty', () => {
      it('should return the result of emailValidation', () => {
        mockBody[USING_BROKER] = 'Yes';

        const response = brokerEmail(mockBody, mockErrors);

        const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

        expect(response).toEqual(expected);
      });
    });

    describe('if email is the incorrect format', () => {
      it('should return the result of emailValidation', () => {
        mockBody[USING_BROKER] = 'Yes';
        mockBody[EMAIL] = 'aaa.com';

        const response = brokerEmail(mockBody, mockErrors);

        const expected = emailValidation(EMAIL, mockBody[EMAIL], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

        expect(response).toEqual(expected);
      });
    });

    describe('if email is valid', () => {
      it('should return the mockErrors', () => {
        mockBody[USING_BROKER] = 'Yes';
        mockBody[EMAIL] = 'test@test.com';

        const response = brokerEmail(mockBody, mockErrors);

        expect(response).toEqual(mockErrors);
      });
    });
  });

  describe('if using broker is "No"', () => {
    it('should return the mockErrors"', () => {
      mockBody[USING_BROKER] = 'No';

      const response = brokerEmail(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });

  describe('if using broker is "null"', () => {
    it('should return the mockErrors', () => {
      mockBody[USING_BROKER] = null;

      const response = brokerEmail(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

import brokerPostcode from './broker-postcode';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import postCodeValidation from '../../../../../../shared-validation/postcode';

const {
  BROKER: { POSTCODE, USING_BROKER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[POSTCODE];

describe('controllers/insurance/business/broker/validation/rules/broker-postcode', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [POSTCODE]: '',
  } as RequestBody;

  describe('when using broker is "Yes"', () => {
    it('should return the result of emptyFieldValidation', () => {
      mockBody[USING_BROKER] = 'Yes';

      const response = brokerPostcode(mockBody, mockErrors);

      const expected = postCodeValidation(POSTCODE, mockBody[POSTCODE], ERROR_MESSAGE.IS_EMPTY, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('when using broker is "No"', () => {
    it('should return the provided errors object', () => {
      mockBody[USING_BROKER] = 'No';

      const response = brokerPostcode(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });

  describe('when using broker is "null"', () => {
    it('should return the provided errors object', () => {
      mockBody[USING_BROKER] = null;

      const response = brokerPostcode(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

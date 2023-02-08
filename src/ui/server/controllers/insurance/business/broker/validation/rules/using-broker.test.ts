import usingBroker from './using-broker';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { USING_BROKER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[USING_BROKER];

describe('controllers/insurance/business/broker/validation/rules/using-broker', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [USING_BROKER]: '',
  } as RequestBody;

  describe(`when the ${USING_BROKER} input is empty`, () => {
    it('should return the result of emptyFieldValidation', () => {
      const response = usingBroker(mockBody, mockErrors);

      const expected = emptyFieldValidation(mockBody, USING_BROKER, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${USING_BROKER} input is valid`, () => {
    it('should not return a validation error', () => {
      mockBody[USING_BROKER] = 'true';
      const response = usingBroker(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

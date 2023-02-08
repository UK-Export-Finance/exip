import usingBroker from './using-broker';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';

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
    it('should return a validation error', () => {
      const response = usingBroker(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.IS_EMPTY;
      const expected = generateValidationErrors(USING_BROKER, errorMessage, mockErrors);

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

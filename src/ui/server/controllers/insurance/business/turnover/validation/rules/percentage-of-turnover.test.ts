import percentageTurnover from './percentage-of-turnover';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody, Errors } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import percentageNumberValidation from '../../../../../../helpers/percentage-number-validation';

const {
  TURNOVER: { PERCENTAGE_TURNOVER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[PERCENTAGE_TURNOVER];

describe('controllers/insurance/business/turnover/validation/rules/percentage-of-turnover', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [PERCENTAGE_TURNOVER]: '',
  } as RequestBody;

  const errorMessages = {
    INCORRECT_FORMAT: ERROR_MESSAGE.INCORRECT_FORMAT,
    BELOW_MINIMUM: ERROR_MESSAGE.BELOW_MINIMUM,
    ABOVE_MAXIMUM: ERROR_MESSAGE.ABOVE_MAXIMUM,
  } as Errors;

  describe(`when the ${PERCENTAGE_TURNOVER} input is empty`, () => {
    it('should return a validation error', () => {
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.IS_EMPTY;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input is invaluid`, () => {
    it('should return result of `percentageNumberValidation`', () => {
      mockBody[PERCENTAGE_TURNOVER] = '-1,5';
      const response = percentageTurnover(mockBody, mockErrors);

      const expected = percentageNumberValidation(mockBody, PERCENTAGE_TURNOVER, mockErrors, errorMessages);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input is valid`, () => {
    it('should return result of `percentageNumberValidation`', () => {
      mockBody[PERCENTAGE_TURNOVER] = '8';
      const response = percentageTurnover(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

import percentageTurnover from './percentage-of-turnover';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';

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

  describe(`when the ${PERCENTAGE_TURNOVER} input is empty`, () => {
    it('should return a validation error', () => {
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.IS_EMPTY;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input contains a letter`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = 'I5';
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input contains a decimal place`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = '3.1';
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input contains a special character`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = '1*';
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input contains a special character and is below 0`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = '-1*';
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input is below 0`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = '-1';
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input is above 100`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = '125';
      const response = percentageTurnover(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.ABOVE_MAXIMUM;
      const expected = generateValidationErrors(PERCENTAGE_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${PERCENTAGE_TURNOVER} input is valid`, () => {
    it('should return a validation error', () => {
      mockBody[PERCENTAGE_TURNOVER] = '8';
      const response = percentageTurnover(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

import employeesInternational from './employees-international';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  NATURE_OF_YOUR_BUSINESS: { EMPLOYEES_INTERNATIONAL: FIELD_ID, EMPLOYEES_UK },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/nature-of-business/validation/rules/employees-international', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is empty`, () => {
    it('should return a validation error', () => {
      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.IS_EMPTY;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input not a number`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = 'a';
      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input has a decimal place`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '5.5';
      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input has a special character`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '5*';
      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input is below 0`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '-5';
      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input is 0`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '0';
      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input less than ${EMPLOYEES_UK}`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '2';
      mockBody[EMPLOYEES_UK] = '5';

      const response = employeesInternational(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.BELOW_UK;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input is valid`, () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '5';
      const response = employeesInternational(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

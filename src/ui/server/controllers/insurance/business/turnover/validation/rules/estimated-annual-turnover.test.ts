import yearsExporting from './estimated-annual-turnover';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import generateValidationErrors from '../../../../../../helpers/validation';
import { mockErrors } from '../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../types';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/turnover/validation/rules/estimated-annual-turnover', () => {
  const mockBody = {
    [ESTIMATED_ANNUAL_TURNOVER]: '',
  } as RequestBody;

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is empty`, () => {
    it('should return a validation error', () => {
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].IS_EMPTY;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input contains a letter`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = 'I5';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input contains a decimal place`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '3.1';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input contains a special character`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '1*';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is below 0 but has a decimal place`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '-3.123';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is below 0 but has a decimal place and letters`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '-3.AB123';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is below 0`, () => {
    it('should not return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '-1';
      const response = yearsExporting(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is valid`, () => {
    it('should not return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '8';
      const response = yearsExporting(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

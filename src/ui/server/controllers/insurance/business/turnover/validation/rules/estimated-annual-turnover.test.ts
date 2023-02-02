import yearsExporting from './estimated-annual-turnover';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/turnover/validation/rules/estimated-annual-turnover', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

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

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is below 0`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '-1';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(ESTIMATED_ANNUAL_TURNOVER, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${ESTIMATED_ANNUAL_TURNOVER} input is valid`, () => {
    it('should return a validation error', () => {
      mockBody[ESTIMATED_ANNUAL_TURNOVER] = '8';
      const response = yearsExporting(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

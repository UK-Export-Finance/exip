import yearsExporting from './years-exporting';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import generateValidationErrors from '../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/nature-of-business/validation/rules/years-exporting', () => {
  const mockBody = {
    [YEARS_EXPORTING]: '',
  } as RequestBody;

  describe(`when the ${YEARS_EXPORTING} input is empty`, () => {
    it('should return a validation error', () => {
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].IS_EMPTY;
      const expected = generateValidationErrors(YEARS_EXPORTING, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${YEARS_EXPORTING} input contains a letter`, () => {
    it('should return a validation error', () => {
      mockBody[YEARS_EXPORTING] = 'O5';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].INCORRECT_FORMAT;
      const expected = generateValidationErrors(YEARS_EXPORTING, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${YEARS_EXPORTING} input contains a decimal place`, () => {
    it('should return a validation error', () => {
      mockBody[YEARS_EXPORTING] = '5.1';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].INCORRECT_FORMAT;
      const expected = generateValidationErrors(YEARS_EXPORTING, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${YEARS_EXPORTING} input contains a special character`, () => {
    it('should return a validation error', () => {
      mockBody[YEARS_EXPORTING] = '5*';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].INCORRECT_FORMAT;
      const expected = generateValidationErrors(YEARS_EXPORTING, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${YEARS_EXPORTING} input is below 0`, () => {
    it('should return a validation error', () => {
      mockBody[YEARS_EXPORTING] = '-1';
      const response = yearsExporting(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].INCORRECT_FORMAT;
      const expected = generateValidationErrors(YEARS_EXPORTING, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${YEARS_EXPORTING} input is valid`, () => {
    it('should return a validation error', () => {
      mockBody[YEARS_EXPORTING] = '5';
      const response = yearsExporting(mockBody, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });
});

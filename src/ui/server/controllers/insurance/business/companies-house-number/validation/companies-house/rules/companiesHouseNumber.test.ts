import companiesHouseNumber from './companiesHouseNumber';
import { FIELD_IDS } from '../../../../../../../constants';
import { RequestBody } from '../../../../../../../../types';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const { COMPANIES_HOUSE_NUMBER } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/companies-house-number/validation/companies-house/rules/companiesHouseNumber', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [COMPANIES_HOUSE_NUMBER]: '',
  } as RequestBody;

  describe('when the companies house number input is incorrectly formatted', () => {
    it('should return validation error when number is an empty string', () => {
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return validation error when number is less than 6 digits long', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = '123';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return validation error when number has special characters', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = '1235!?';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return validation error when number is a space', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = ' ';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return validation error when number has a space', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = '123456 ';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return validation error when number is null', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = null;
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = EXPORTER_BUSINESS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;
      const expected = generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the companies house number input is correctly formatted', () => {
    it('should not return validation error when number is more than 6 numbers long', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = '8989898';
      const result = companiesHouseNumber(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });

    it('should not return validation error when number is more than 6 numbers long and has letters and numbers', () => {
      mockBody[COMPANIES_HOUSE_NUMBER] = 'SC907816';
      const result = companiesHouseNumber(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

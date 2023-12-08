import companiesHouseNumber from './companiesHouseNumber';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { RequestBody } from '../../../../../types';
import generateValidationErrors from '../../../validation';
import { ERROR_MESSAGES } from '../../../../content-strings';

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const { ELIGIBILITY } = ERROR_MESSAGES.INSURANCE;

describe('helpers/companies-house-search/validation/rules/companiesHouseNumber', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe('when the companies house number input is incorrectly formatted', () => {
    it('should return a validation error when number is an empty string', () => {
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = ELIGIBILITY[FIELD_ID].IS_EMPTY;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return a validation error when number is less than 6 digits long', () => {
      mockBody[FIELD_ID] = '123';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = ELIGIBILITY[FIELD_ID].INCORRECT_FORMAT;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return a validation error when number has special characters', () => {
      mockBody[FIELD_ID] = '1235!?';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = ELIGIBILITY[FIELD_ID].INCORRECT_FORMAT;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return a validation error when number is a space', () => {
      mockBody[FIELD_ID] = ' ';
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = ELIGIBILITY[FIELD_ID].INCORRECT_FORMAT;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it('should return a validation error when number is null', () => {
      mockBody[FIELD_ID] = null;
      const result = companiesHouseNumber(mockBody, mockErrors);

      const errorMessage = ELIGIBILITY[FIELD_ID].IS_EMPTY;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the companies house number input is correctly formatted', () => {
    describe('when the number is more than 6 numbers long', () => {
      describe('with pure numbers', () => {
        it('should not return a validation error', () => {
          mockBody[FIELD_ID] = '8989898';
          const result = companiesHouseNumber(mockBody, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });

      describe('with letters and numbers', () => {
        it('should not return a validation error', () => {
          mockBody[FIELD_ID] = 'SC907816';
          const result = companiesHouseNumber(mockBody, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });

      describe('with letters, numbers and white spaces', () => {
        it('should not return a validation error', () => {
          mockBody[FIELD_ID] = ' SC907816 ';
          const result = companiesHouseNumber(mockBody, mockErrors);

          expect(result).toEqual(mockErrors);
        });
      });
    });
  });
});

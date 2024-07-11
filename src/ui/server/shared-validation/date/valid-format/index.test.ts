import validDateFormatRules from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../content-strings';
import generateValidationErrors from '../../../helpers/validation';
import { mockErrors } from '../../../test-mocks';

const {
  POLICY: {
    CONTRACT_POLICY: { REQUESTED_START_DATE: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('shared-validation/date/valid-format', () => {
  const date = new Date();

  const dayString = String(date.getDate());
  const monthString = String(date.getMonth());
  const yearString = String(date.getFullYear());

  const baseParams = {
    formBody: {},
    dayString,
    monthString,
    yearString,
    errors: mockErrors,
    fieldId: FIELD_ID,
    errorMessages: ERROR_MESSAGES_OBJECT,
  };

  describe('when no day/month/year fields are provided', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, dayString: '', monthString: '', yearString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when any day/month/year field is NOT a number', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, dayString: 'One', monthString: 'Two', yearString: 'Three' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a valid day is provided, but month and year are not', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, monthString: '', yearString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.MISSING_MONTH_AND_YEAR, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a valid month is provided, but day and year are not', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, dayString: '', yearString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.MISSING_DAY_AND_YEAR, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a valid year is provided, but day and month are not', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, dayString: '', monthString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.MISSING_DAY_AND_MONTH, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when day is not provided', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, dayString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_DAY, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when month is not provided', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, monthString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_MONTH, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when year is not provided', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, yearString: '' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_YEAR, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when year has less than 4 digits', () => {
    it('should return a validation error', () => {
      const result = validDateFormatRules({ ...baseParams, yearString: '202' });

      const expected = {
        hasErrors: true,
        errors: generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_YEAR_DIGITS, mockErrors),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const result = validDateFormatRules({ ...baseParams });

      const expected = {
        hasErrors: false,
        errors: mockErrors,
      };

      expect(result).toEqual(expected);
    });
  });
});

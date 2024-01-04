import dateRules from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';

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

describe('shared-validation/date', () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const futureDate = new Date(date.setMonth(month + 6));

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const baseParams = {
    errors: mockErrors,
    fieldId: FIELD_ID,
    errorMessages: ERROR_MESSAGES_OBJECT,
  };

  const mockValidBody = {
    [`${FIELD_ID}-day`]: futureDate.getDate(),
    [`${FIELD_ID}-month`]: futureDate.getMonth(),
    [`${FIELD_ID}-year`]: futureDate.getFullYear(),
  };

  describe('when no day/month/year fields are provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: '',
        [`${FIELD_ID}-month`]: '',
        [`${FIELD_ID}-year`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when any day/month/year field is NOT a number', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: 'One',
        [`${FIELD_ID}-month`]: 'Two',
        [`${FIELD_ID}-year`]: 'Three',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a valid day is provided, but month and year are not', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-month`]: '',
        [`${FIELD_ID}-year`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.MISSING_MONTH_AND_YEAR, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a valid month is provided, but day and year are not', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-day`]: '',
        [`${FIELD_ID}-year`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.MISSING_DAY_AND_YEAR, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a valid year is provided, but day and month are not', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-day`]: '',
        [`${FIELD_ID}-month`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.MISSING_DAY_AND_MONTH, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when day is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-day`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_DAY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when month is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-month`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_MONTH, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when year is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-year`]: '',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_YEAR, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when year has less than 4 digits', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-year`]: '202',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_YEAR_DIGITS, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is invalid', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: '50',
        [`${FIELD_ID}-month`]: '24',
        [`${FIELD_ID}-year`]: year,
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_DATE, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should return validation error', () => {
      const yesterday = new Date(date.setDate(day - 1));

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: yesterday.getDate(),
        [`${FIELD_ID}-month`]: month + 1,
        [`${FIELD_ID}-year`]: year,
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.BEFORE_EARLIEST, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is today', () => {
    it('should NOT return a validation error', () => {
      const today = new Date();

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: today.getDate(),
        [`${FIELD_ID}-month`]: today.getMonth() + 1,
        [`${FIELD_ID}-year`]: today.getFullYear(),
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const result = dateRules({ ...baseParams, formBody: mockValidBody });

      expect(result).toEqual(mockErrors);
    });
  });
});

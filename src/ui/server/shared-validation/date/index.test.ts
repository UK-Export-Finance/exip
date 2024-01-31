import dateRules from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import validDateFormatRules from './valid-format';
import generateValidationErrors from '../../helpers/validation';
import getDaysInAMonth from '../../helpers/date/get-days-in-a-month';
import { mockErrors } from '../../test-mocks';

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
  const futureDateMonth = futureDate.getMonth();
  const futureDateYear = futureDate.getFullYear();
  const futureDateDay = getDaysInAMonth(futureDateMonth, futureDateYear);

  const baseParams = {
    errors: mockErrors,
    fieldId: FIELD_ID,
    errorMessages: ERROR_MESSAGES_OBJECT,
  };

  const mockValidBody = {
    [`${FIELD_ID}-day`]: futureDateDay,
    [`${FIELD_ID}-month`]: futureDateMonth,
    [`${FIELD_ID}-year`]: futureDateYear,
  };

  describe('when a data has an invalid format', () => {
    it('should return the result of validDateFormatRules', () => {
      const mockEmptyString = '';

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: mockEmptyString,
        [`${FIELD_ID}-month`]: mockEmptyString,
        [`${FIELD_ID}-year`]: mockEmptyString,
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const formatErrors = validDateFormatRules({
        ...baseParams,
        formBody: mockSubmittedData,
        dayString: mockEmptyString,
        monthString: mockEmptyString,
        yearString: mockEmptyString,
      });

      const expected = formatErrors.errors;

      expect(result).toEqual(expected);
    });
  });

  describe('when the day is greater than the current month', () => {
    const daysInMonth = getDaysInAMonth(month, year);

    const invalidDay = daysInMonth + 1;

    it('should a return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-day`]: invalidDay,
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_DAY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is invalid', () => {
    it('should a return validation error', () => {
      const mockSubmittedData = {
        ...mockValidBody,
        [`${FIELD_ID}-month`]: '24',
      };

      const result = dateRules({ ...baseParams, formBody: mockSubmittedData });

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.INVALID_DATE, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should a return validation error', () => {
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

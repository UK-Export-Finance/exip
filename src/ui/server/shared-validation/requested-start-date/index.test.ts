import { add, getDate, getMonth, getYear, sub } from 'date-fns';
import requestedStartDateRules from '.';
import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: { REQUESTED_START_DATE: FIELD_ID },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('shared-validation/requested-start-date', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when day field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-month`]: '1',
        [`${FIELD_ID}-year`]: '2022',
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when month field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: '10',
        [`${FIELD_ID}-year`]: '2022',
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when year field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: '10',
        [`${FIELD_ID}-month`]: '1',
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

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

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should return validation error', () => {
      const date = new Date();
      const yesterday = sub(date, { days: 1, months: 1 });

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: getDate(yesterday),
        [`${FIELD_ID}-month`]: getMonth(yesterday),
        [`${FIELD_ID}-year`]: getYear(yesterday),
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BEFORE_EARLIEST, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const date = new Date();
      const futureDate = add(date, { months: 6 });

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: getDate(futureDate),
        [`${FIELD_ID}-month`]: getMonth(futureDate),
        [`${FIELD_ID}-year`]: getYear(futureDate),
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

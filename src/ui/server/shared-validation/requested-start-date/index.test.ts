import requestedStartDateRules from '.';
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
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('shared-validation/requested-start-date', () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when day field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-month`]: month,
        [`${FIELD_ID}-year`]: year,
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when month field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: day,
        [`${FIELD_ID}-year`]: year,
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when year field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: day,
        [`${FIELD_ID}-month`]: month,
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

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

  describe('when the date is invalid', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: day,
        [`${FIELD_ID}-month`]: '24',
        [`${FIELD_ID}-year`]: year,
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should return validation error', () => {
      const yesterday = new Date(date.setDate(day - 1));

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: yesterday.getDate(),
        [`${FIELD_ID}-month`]: month,
        [`${FIELD_ID}-year`]: year,
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BEFORE_EARLIEST, mockErrors);

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

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const futureDate = new Date(date.setMonth(month + 6));

      const mockSubmittedData = {
        [`${FIELD_ID}-day`]: futureDate.getDate(),
        [`${FIELD_ID}-month`]: futureDate.getMonth(),
        [`${FIELD_ID}-year`]: futureDate.getFullYear(),
      };

      const result = requestedStartDateRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

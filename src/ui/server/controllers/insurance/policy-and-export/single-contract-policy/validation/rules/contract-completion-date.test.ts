import { add, getDate, getMonth, getYear, sub } from 'date-fns';
import contractCompletionDateRules from './contract-completion-date';
import { FIELD_IDS, PRODUCT } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        SINGLE: { CONTRACT_COMPLETION_DATE },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        SINGLE: { [CONTRACT_COMPLETION_DATE]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy-and-export/single-contract-policy/validation/rules/contract-completion-date', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when day field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-month`]: '1',
        [`${CONTRACT_COMPLETION_DATE}-year`]: '2022',
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when month field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: '10',
        [`${CONTRACT_COMPLETION_DATE}-year`]: '2022',
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when year field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: '10',
        [`${CONTRACT_COMPLETION_DATE}-month`]: '1',
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when any day/month/year field is NOT a number', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: 'One',
        [`${CONTRACT_COMPLETION_DATE}-month`]: '!@',
        [`${CONTRACT_COMPLETION_DATE}-year`]: ' ',
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.NOT_A_NUMBER, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should return validation error', () => {
      const date = new Date();
      const yesterday = sub(date, { days: 1, months: 1 });

      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(yesterday),
        [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(yesterday),
        [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(yesterday),
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.BEFORE_EARLIEST, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${REQUESTED_START_DATE} is also provided`, () => {
    const date = new Date();
    const futureDate = sub(date, { months: 3 });

    const requestedStartDateFields = {
      [`${REQUESTED_START_DATE}-day`]: getDate(futureDate),
      [`${REQUESTED_START_DATE}-month`]: getMonth(futureDate),
      [`${REQUESTED_START_DATE}-year`]: getYear(futureDate),
    };

    describe(`when the date is the same as ${REQUESTED_START_DATE}`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          ...requestedStartDateFields,
          [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(futureDate),
          [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(futureDate),
          [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(futureDate),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.CANNOT_BE_THE_SAME, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when the date is before the ${REQUESTED_START_DATE}`, () => {
      const completionDate = sub(futureDate, { days: 1 });

      it('should return validation error', () => {
        const mockSubmittedData = {
          ...requestedStartDateFields,
          [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(completionDate),
          [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(completionDate),
          [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(completionDate),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.CANNOT_BE_BEFORE, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when the date is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      const completionDate = add(futureDate, { years: PRODUCT.MAX_COVER_PERIOD_YEARS, days: 1 });

      it('should return validation error', () => {
        const mockSubmittedData = {
          ...requestedStartDateFields,
          [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(completionDate),
          [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(completionDate),
          [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(completionDate),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.AFTER_LATEST, mockErrors);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const date = new Date();
      const futureDate = add(date, { months: 6 });

      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(futureDate),
        [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(futureDate),
        [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(futureDate),
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

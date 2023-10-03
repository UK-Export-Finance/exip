import { add, getDate, getMonth, getYear } from 'date-fns';
import contractCompletionDateRules from './contract-completion-date';
import { FIELD_IDS, ELIGIBILITY } from '../../../../../../constants';
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

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

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

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

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

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

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

  describe('when the date is invalid', () => {
    it('should return validation error', () => {
      const date = new Date();
      const futureDate = add(date, { days: 1, months: 1 });

      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(futureDate),
        [`${CONTRACT_COMPLETION_DATE}-month`]: '24',
        [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(futureDate),
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should return validation error', () => {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1);

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

    // Add 1 day
    const initFutureDate = new Date(date.setDate(date.getDate() + 1));

    // Add 1 year
    const futureDate = new Date(initFutureDate.setFullYear(getYear(initFutureDate) + 1));

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

    describe(`when ${CONTRACT_COMPLETION_DATE} is before ${REQUESTED_START_DATE}`, () => {
      const now = new Date();
      const nextYear = new Date(now.setFullYear(now.getFullYear() + 1));

      const day = nextYear.getDate();

      let nextYear1week = new Date(nextYear);
      nextYear1week = new Date(nextYear1week.setDate(day + 1 * 7));

      it('should return validation error', () => {
        const mockSubmittedData = {
          [`${REQUESTED_START_DATE}-day`]: getDate(nextYear1week),
          [`${REQUESTED_START_DATE}-month`]: getMonth(nextYear1week),
          [`${REQUESTED_START_DATE}-year`]: getYear(nextYear1week),
          [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(nextYear),
          [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(nextYear),
          [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(nextYear),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.CANNOT_BE_BEFORE, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when the date is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      const completionDate = add(futureDate, { years: ELIGIBILITY.MAX_COVER_PERIOD_YEARS, days: 1 });

      it('should return validation error', () => {
        const mockSubmittedData = {
          ...requestedStartDateFields,
          [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(completionDate) + 1,
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
        [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(futureDate) + 1,
        [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(futureDate),
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

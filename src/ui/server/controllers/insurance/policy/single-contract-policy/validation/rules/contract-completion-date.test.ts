import contractCompletionDateRules from './contract-completion-date';
import { FIELD_IDS, ELIGIBILITY } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        SINGLE: { CONTRACT_COMPLETION_DATE },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [CONTRACT_COMPLETION_DATE]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/single-contract-policy/validation/rules/contract-completion-date', () => {
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
      const day = date.getDate();
      const month = date.getMonth();

      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: day,
        [`${CONTRACT_COMPLETION_DATE}-month`]: '24',
        [`${CONTRACT_COMPLETION_DATE}-year`]: month,
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the date is in the past', () => {
    it('should return validation error', () => {
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1));

      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: yesterday.getDate(),
        [`${CONTRACT_COMPLETION_DATE}-month`]: yesterday.getMonth(),
        [`${CONTRACT_COMPLETION_DATE}-year`]: yesterday.getFullYear(),
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.BEFORE_EARLIEST, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${REQUESTED_START_DATE} is also provided`, () => {
    let date = new Date();
    let year = date.getFullYear();

    // Add 1 day
    const initFutureDate = new Date(date.setDate(date.getDate() + 1));

    // Add 1 year
    const futureDateYear = initFutureDate.getFullYear();
    const futureDate = new Date(initFutureDate.setFullYear(futureDateYear + 1));

    let requestedStartDateFields = {};

    beforeEach(() => {
      requestedStartDateFields = {
        [`${REQUESTED_START_DATE}-day`]: futureDate.getDate(),
        [`${REQUESTED_START_DATE}-month`]: futureDate.getMonth(),
        [`${REQUESTED_START_DATE}-year`]: futureDate.getFullYear(),
      };
    });

    describe(`when ${CONTRACT_COMPLETION_DATE} is the same as ${REQUESTED_START_DATE}`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          ...requestedStartDateFields,
          [`${CONTRACT_COMPLETION_DATE}-day`]: futureDate.getDate(),
          [`${CONTRACT_COMPLETION_DATE}-month`]: futureDate.getMonth(),
          [`${CONTRACT_COMPLETION_DATE}-year`]: futureDate.getFullYear(),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.CANNOT_BE_THE_SAME, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CONTRACT_COMPLETION_DATE} is before ${REQUESTED_START_DATE}`, () => {
      const nextYear = new Date(date.setFullYear(year + 1));

      const day = nextYear.getDate();

      let nextYear1week = new Date(nextYear);
      nextYear1week = new Date(nextYear1week.setDate(day + 1 * 7));

      it('should return validation error', () => {
        const mockSubmittedData = {
          [`${REQUESTED_START_DATE}-day`]: nextYear1week.getDate(),
          [`${REQUESTED_START_DATE}-month`]: nextYear1week.getMonth(),
          [`${REQUESTED_START_DATE}-year`]: nextYear1week.getFullYear(),
          [`${CONTRACT_COMPLETION_DATE}-day`]: nextYear.getDate(),
          [`${CONTRACT_COMPLETION_DATE}-month`]: nextYear.getMonth(),
          [`${CONTRACT_COMPLETION_DATE}-year`]: nextYear.getFullYear(),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGE.CANNOT_BE_BEFORE, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CONTRACT_COMPLETION_DATE} is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      date = new Date();

      const day = date.getDate();
      const month = date.getMonth();
      year = date.getFullYear();

      const futureYear = new Date(futureDate.setFullYear(futureDateYear + ELIGIBILITY.MAX_COVER_PERIOD_YEARS));
      const completionDate = new Date(futureYear.setDate(day + 1));

      it('should return validation error', () => {
        const mockSubmittedData = {
          [`${REQUESTED_START_DATE}-day`]: day,
          [`${REQUESTED_START_DATE}-month`]: month,
          [`${REQUESTED_START_DATE}-year`]: year,
          [`${CONTRACT_COMPLETION_DATE}-day`]: completionDate.getDate(),
          [`${CONTRACT_COMPLETION_DATE}-month`]: completionDate.getMonth(),
          [`${CONTRACT_COMPLETION_DATE}-year`]: completionDate.getFullYear(),
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
      const month = date.getMonth();
      const futureDate = new Date(date.setMonth(month + 6));

      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: futureDate.getDate(),
        [`${CONTRACT_COMPLETION_DATE}-month`]: futureDate.getMonth() + 1,
        [`${CONTRACT_COMPLETION_DATE}-year`]: futureDate.getFullYear(),
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

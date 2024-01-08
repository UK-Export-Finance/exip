import contractCompletionDateRules from './contract-completion-date';
import { ELIGIBILITY } from '../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import dateRules from '../../../../../../shared-validation/date';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [CONTRACT_COMPLETION_DATE]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/single-contract-policy/validation/rules/contract-completion-date', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when fields are invalid', () => {
    it('should return validation the result of dateRules', () => {
      const mockSubmittedData = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: '1',
      };

      const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

      const expected = dateRules({
        formBody: mockSubmittedData,
        errors: mockErrors,
        fieldId: CONTRACT_COMPLETION_DATE,
        errorMessages: ERROR_MESSAGES_OBJECT,
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${REQUESTED_START_DATE} is also provided`, () => {
    let date = new Date();
    const month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Add 1 day
    const initFutureDate = new Date(date.setDate(date.getDate() + 1));

    // Add 1 year
    const futureDateYear = initFutureDate.getFullYear();
    const futureDate = new Date(initFutureDate.setFullYear(futureDateYear + 1));

    const futureDateMonth = initFutureDate.getMonth() + 1;

    let requestedStartDateFields = {};

    beforeEach(() => {
      requestedStartDateFields = {
        [`${REQUESTED_START_DATE}-day`]: futureDate.getDate(),
        [`${REQUESTED_START_DATE}-month`]: futureDateMonth,
        [`${REQUESTED_START_DATE}-year`]: futureDate.getFullYear(),
      };
    });

    describe(`when ${CONTRACT_COMPLETION_DATE} is the same as ${REQUESTED_START_DATE}`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          ...requestedStartDateFields,
          [`${CONTRACT_COMPLETION_DATE}-day`]: futureDate.getDate(),
          [`${CONTRACT_COMPLETION_DATE}-month`]: futureDateMonth,
          [`${CONTRACT_COMPLETION_DATE}-year`]: futureDate.getFullYear(),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGES_OBJECT.CANNOT_BE_THE_SAME, mockErrors);

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
          [`${REQUESTED_START_DATE}-month`]: nextYear1week.getMonth() + 1,
          [`${REQUESTED_START_DATE}-year`]: nextYear1week.getFullYear(),
          [`${CONTRACT_COMPLETION_DATE}-day`]: nextYear.getDate(),
          [`${CONTRACT_COMPLETION_DATE}-month`]: nextYear.getMonth() + 1,
          [`${CONTRACT_COMPLETION_DATE}-year`]: nextYear.getFullYear(),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGES_OBJECT.CANNOT_BE_BEFORE, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CONTRACT_COMPLETION_DATE} is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      date = new Date();

      const day = date.getDate();
      year = date.getFullYear();

      const futureYear = new Date(futureDate.setFullYear(futureDateYear + ELIGIBILITY.MAX_COVER_PERIOD_YEARS));
      const completionDate = new Date(futureYear.setDate(day + 1));

      it('should return validation error', () => {
        const mockSubmittedData = {
          [`${REQUESTED_START_DATE}-day`]: day,
          [`${REQUESTED_START_DATE}-month`]: month,
          [`${REQUESTED_START_DATE}-year`]: year,
          [`${CONTRACT_COMPLETION_DATE}-day`]: completionDate.getDate(),
          [`${CONTRACT_COMPLETION_DATE}-month`]: completionDate.getMonth() + 1,
          [`${CONTRACT_COMPLETION_DATE}-year`]: completionDate.getFullYear(),
        };

        const result = contractCompletionDateRules(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CONTRACT_COMPLETION_DATE, ERROR_MESSAGES_OBJECT.AFTER_LATEST, mockErrors);

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

import rule from './credit-period';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
  POLICY_TYPE,
} = FIELD_IDS;

describe('controllers/quote/tell-us-about-your-policy/validation/rules/credit-period', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when policy type is multiple', () => {
    describe(`when ${CREDIT_PERIOD} is not provided`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          [CREDIT_PERIOD]: '',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CREDIT_PERIOD, ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CREDIT_PERIOD} is below the minimum`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          [CREDIT_PERIOD]: '0',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CREDIT_PERIOD, ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].BELOW_MINIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CREDIT_PERIOD} is above the maximum`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          [CREDIT_PERIOD]: '3',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(CREDIT_PERIOD, ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].ABOVE_MAXIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no validation errors', () => {
      it('should return the already provided errors', () => {
        const mockSubmittedData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          [CREDIT_PERIOD]: '1',
        };

        const result = rule(mockSubmittedData, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });
  });

  describe('when policy type is single', () => {
    it('should not return any validation errors', () => {
      const mockSubmittedData = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = mockErrors;

      expect(result).toEqual(expected);
    });
  });
});

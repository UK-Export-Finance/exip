import rule from './policy-length';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const { POLICY_TYPE, SINGLE_POLICY_LENGTH } = FIELD_IDS;

describe('controllers/quote/policy-type/validation/rules/policy-length', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  describe('when policy type is single', () => {
    beforeEach(() => {
      mockBody[POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.SINGLE;
    });

    describe(`when ${SINGLE_POLICY_LENGTH} is not provided`, () => {
      it('should return validation error', () => {
        mockBody[SINGLE_POLICY_LENGTH] = '';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${SINGLE_POLICY_LENGTH} has a decimal`, () => {
      it('should return validation error', () => {
        mockBody[SINGLE_POLICY_LENGTH] = '1.2';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${SINGLE_POLICY_LENGTH} is not a number`, () => {
      it('should return validation error', () => {
        mockBody[SINGLE_POLICY_LENGTH] = 'invalid';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].NOT_A_NUMBER, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${SINGLE_POLICY_LENGTH} is below the minimum`, () => {
      it('should return validation error', () => {
        mockBody[SINGLE_POLICY_LENGTH] = '0';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].BELOW_MINIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${SINGLE_POLICY_LENGTH} is above the maximum`, () => {
      it('should return validation error', () => {
        mockBody[SINGLE_POLICY_LENGTH] = '25';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when there are no validation errors - single policy', () => {
    it('should return the already provided errors', () => {
      mockBody[POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.SINGLE;
      mockBody[SINGLE_POLICY_LENGTH] = '8';

      const result = rule(mockBody, mockErrors);

      const expected = { summary: [], errorList: {} };

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors - multiple policy', () => {
    it('should return the already provided errors', () => {
      mockBody[POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

      const result = rule(mockBody, mockErrors);

      const expected = { summary: [], errorList: {} };

      expect(result).toEqual(expected);
    });
  });
});

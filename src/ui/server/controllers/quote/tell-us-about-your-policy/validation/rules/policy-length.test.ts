import rule from './policy-length';
import { ELIGIBILITY, FIELD_IDS, FIELD_VALUES, MINIMUM_CHARACTERS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';
import { mockErrors } from '../../../../../test-mocks';
import { RequestBody } from '../../../../../../types';

const { POLICY_TYPE, POLICY_LENGTH: FIELD_ID } = FIELD_IDS;

const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

describe('controllers/quote/tell-us-about-your-policy/validation/rules/policy-length', () => {
  const mockBody: RequestBody = {
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  describe('when policy type is single', () => {
    beforeEach(() => {
      mockBody[POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.SINGLE;
    });

    describe(`when ${FIELD_ID} is not provided`, () => {
      it('should return a validation error', () => {
        mockBody[FIELD_ID] = '';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_ID} has a decimal`, () => {
      it('should return a validation error', () => {
        mockBody[FIELD_ID] = '1.2';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_WHOLE_NUMBER, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_ID} is not a number`, () => {
      it('should return a validation error', () => {
        mockBody[FIELD_ID] = 'invalid';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_ID} is below the minimum`, () => {
      it('should return a validation error', () => {
        mockBody[FIELD_ID] = String(MINIMUM_CHARACTERS.QUOTE.POLICY_LENGTH - 1);

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_ID} is above the maximum`, () => {
      it('should return a validation error', () => {
        mockBody[FIELD_ID] = String(ELIGIBILITY.MAX_COVER_PERIOD_MONTHS + 1);

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when there are no validation errors - single policy', () => {
    it('should return the already provided errors', () => {
      mockBody[POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.SINGLE;
      mockBody[FIELD_ID] = '8';

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

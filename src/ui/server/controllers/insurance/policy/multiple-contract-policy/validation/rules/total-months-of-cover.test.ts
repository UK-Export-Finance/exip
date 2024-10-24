import totalMonthsOfCover from './total-months-of-cover';
import { APPLICATION } from '../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import generateValidationErrors from '../../../../../../helpers/validation';
import { mockErrors } from '../../../../../../test-mocks';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER: FIELD_ID },
  },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/multiple-contract-policy/validation/rules/total-months-of-cover', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  describe('when a value is not provided', () => {
    it('should return the result of emptyFieldValidation', () => {
      const result = totalMonthsOfCover(mockBody, mockErrors);

      const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is not a number', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = 'one';

      const result = totalMonthsOfCover(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a decimal', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '7.5';

      const result = totalMonthsOfCover(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is below the minimum', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = String(APPLICATION.POLICY.TOTAL_MONTHS_OF_COVER.MINIMUM - 1);

      const result = totalMonthsOfCover(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is above the maximum', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = String(APPLICATION.POLICY.TOTAL_MONTHS_OF_COVER.MAXIMUM + 1);

      const result = totalMonthsOfCover(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});

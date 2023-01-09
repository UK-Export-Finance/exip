import totalMonthsOfCover from './total-months-of-cover';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_MONTHS_OF_COVER: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy-and-export/multiple-contract-policy/validation/rules/total-months-of-cover', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {};

      const result = totalMonthsOfCover(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 1,
      };

      const result = totalMonthsOfCover(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

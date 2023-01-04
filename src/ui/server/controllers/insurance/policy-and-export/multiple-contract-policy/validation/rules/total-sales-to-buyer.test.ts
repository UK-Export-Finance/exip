import totalContractValueRules from './total-sales-to-buyer';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_SALES_TO_BUYER: FIELD_ID },
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

describe('controllers/insurance/policy-and-export/multiple-contract-policy/validation/rules/total-sales-to-buyer', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {};

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total sales to buyer is not a number', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 'One hundred!',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total sales to buyer contains a decimal', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '123.456',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_WHOLE_NUMBER, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total sales to buyer is below the minimum', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '0',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '10000',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

import totalContractValueRules from './total-contract-value';
import { FIELD_IDS, APPLICATION } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: {
        SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

const { MAXIMUM } = APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT;

describe('controllers/insurance/policy/single-contract-policy/validation/rules/total-contract-value', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {};

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total contract value is not a number', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 'One hundred!',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total contract value contains a decimal', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '123.456',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total contract value contains a comma and decimal', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '123,456.78',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total contract value is below the minimum', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '0',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total contract value is above the maximum', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: String(MAXIMUM + 1),
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '40000',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when there are no validation errors and the value contains a comma', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '40,000',
      };

      const result = totalContractValueRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

import maximumBuyerWillOweRules from './maximum-buyer-will-owe';
import { APPLICATION, FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { MAXIMUM_BUYER_WILL_OWE: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/multiple-contract-policy/validation/rules/maximum-buyer-will-owe', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {};

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when maximum buyer will owe is not a number', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 'One hundred!',
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when maximum buyer will owe contains a decimal', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '123.456',
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when maximum buyer will owe contains a comma and decimal', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '123,456.78',
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when maximum buyer will owe is below the minimum', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '0',
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when maximum buyer will owe is above the minimum', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: `${APPLICATION.POLICY.MAXIMUM_BUYER_CAN_OWE + 1}`,
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '10000',
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when there are no validation errors and the value contains a comma', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: '10,000',
      };

      const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

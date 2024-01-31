import totalOutstandingRules from './total-outstanding';
import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { mockErrors } from '../../../../../../test-mocks';

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/trading-history/validation/rules/total-outstanding', () => {
  describe(`when ${OUTSTANDING_PAYMENTS} is not "true"`, () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'false',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_ID} is not a number`, () => {
    it('should return `wholeNumberValidation`', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
        [FIELD_ID]: 'One hundred!',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      const expected = wholeNumberValidation(mockSubmittedData, mockErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_ID} contains a decimal`, () => {
    it('should return `wholeNumberValidation`', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
        [FIELD_ID]: '123.456',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      const expected = wholeNumberValidation(mockSubmittedData, mockErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_ID} contains a comma and decimal`, () => {
    it('should return `wholeNumberValidation`', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
        [FIELD_ID]: '123,456.78',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      const expected = wholeNumberValidation(mockSubmittedData, mockErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_ID} is below the minimum`, () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
        [FIELD_ID]: '0',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
        [FIELD_ID]: '10,000',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when there are no validation errors and the value contains a comma', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
        [FIELD_ID]: '10,000',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

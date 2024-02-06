import totalOutstandingRules, { MINIMUM } from './total-outstanding';
import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import wholeNumberAboveMinimumValidation from '../../../../../../shared-validation/whole-number-above-minimum';
import { mockErrors } from '../../../../../../test-mocks';

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/trading-history/validation/rules/total-outstanding', () => {
  describe(`when ${OUTSTANDING_PAYMENTS} is "true"`, () => {
    it('should return the result of wholeNumberAboveMinimumValidation', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      const expected = wholeNumberAboveMinimumValidation(mockSubmittedData, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MINIMUM);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${OUTSTANDING_PAYMENTS} is not "true"`, () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'false',
      };

      const result = totalOutstandingRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

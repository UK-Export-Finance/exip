import amountOverdueRules, { MINIMUM } from './amount-overdue';
import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../shared-validation/number-above-minimum';
import { mockErrors } from '../../../../../../test-mocks';

const { OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/trading-history/validation/rules/amount-overdue', () => {
  describe(`when ${OUTSTANDING_PAYMENTS} is "true"`, () => {
    it('should return the result of numberAboveMinimumValidation', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'true',
      };

      const result = amountOverdueRules(mockSubmittedData, mockErrors);

      const expected = numberAboveMinimumValidation({
        formBody: mockSubmittedData,
        fieldId: FIELD_ID,
        errorMessage: ERROR_MESSAGES_OBJECT,
        errors: mockErrors,
        minimum: MINIMUM,
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${OUTSTANDING_PAYMENTS} is not "true"`, () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [OUTSTANDING_PAYMENTS]: 'false',
      };

      const result = amountOverdueRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});

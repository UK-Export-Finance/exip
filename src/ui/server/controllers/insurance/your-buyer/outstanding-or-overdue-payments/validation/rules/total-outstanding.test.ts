import totalOutstandingRules from './total-outstanding';
import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../shared-validation/number-above-minimum';
import { MINIMUM_CHARACTERS } from '../../../../../../constants';
import { mockErrors } from '../../../../../../test-mocks';

const { TOTAL_OUTSTANDING_PAYMENTS: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/outstanding-or-overdue-payments/validation/rules/total-outstanding', () => {
  it('should return the result of numberAboveMinimumValidation', () => {
    const mockSubmittedData = {
      [FIELD_ID]: '2.5',
    };

    const result = totalOutstandingRules(mockSubmittedData, mockErrors);

    const expected = numberAboveMinimumValidation({
      formBody: mockSubmittedData,
      fieldId: FIELD_ID,
      errorMessage: ERROR_MESSAGES_OBJECT,
      errors: mockErrors,
      minimum: MINIMUM_CHARACTERS.ONE,
    });

    expect(result).toEqual(expected);
  });
});

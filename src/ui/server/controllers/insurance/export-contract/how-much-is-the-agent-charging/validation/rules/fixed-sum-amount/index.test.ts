import fixedSumAmountRule from '.';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_CHARGES: { [FIELD_ID]: FIXED_SUM_AMOUNT_ERROR_MESSAGES },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/how-much-the-agent-is-charging/validation/rules/fixed-sum-amount', () => {
  it('should return the result of numberAboveMinimumValidation', () => {
    const mockBody = {
      [FIELD_ID]: '',
    };

    const result = fixedSumAmountRule(mockBody, mockErrors);

    const expected = numberAboveMinimumValidation({
      formBody: mockBody,
      fieldId: FIELD_ID,
      errorMessage: FIXED_SUM_AMOUNT_ERROR_MESSAGES,
      errors: mockErrors,
      minimum: MINIMUM_CHARACTERS.ONE,
      allowDecimalPlaces: true,
    });

    expect(result).toEqual(expected);
  });
});

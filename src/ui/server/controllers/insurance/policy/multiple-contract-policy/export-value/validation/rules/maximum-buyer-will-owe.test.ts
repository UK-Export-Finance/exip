import maximumBuyerWillOweRules from './maximum-buyer-will-owe';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE: FIELD_ID },
  },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/multiple-contract-policy/export-value/validation/rules/maximum-buyer-will-owe', () => {
  it('should return the result of numberAboveMinimumValidation', () => {
    const mockSubmittedData = {};

    const result = maximumBuyerWillOweRules(mockSubmittedData, mockErrors);

    const expected = numberAboveMinimumValidation({
      formBody: mockSubmittedData,
      fieldId: FIELD_ID,
      errorMessage: ERROR_MESSAGES_OBJECT,
      errors: mockErrors,
      minimum: MINIMUM_CHARACTERS.POLICY.MAXIMUM_BUYER_WILL_OWE,
    });

    expect(result).toEqual(expected);
  });
});

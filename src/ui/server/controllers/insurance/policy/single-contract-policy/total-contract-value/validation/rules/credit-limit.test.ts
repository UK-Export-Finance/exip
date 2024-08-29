import creditLimitRules from './credit-limit';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { mockErrors } from '../../../../../../../test-mocks';

const MINIMUM = MINIMUM_CHARACTERS.POLICY.CREDIT_LIMIT;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { CREDIT_LIMIT: FIELD_ID },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/single-contract-policy/total-contract-value/validation/rules/credit-limit', () => {
  it('should return the result of numberAboveMinimumValidation', () => {
    const mockSubmittedData = {};

    const result = creditLimitRules(mockSubmittedData, mockErrors);

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

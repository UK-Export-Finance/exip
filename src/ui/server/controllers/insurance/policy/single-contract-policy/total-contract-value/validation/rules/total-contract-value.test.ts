import totalContractValueRules from './total-contract-value';
import { APPLICATION } from '../../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import wholeNumberAboveMinimumValidation from '../../../../../../../shared-validation/whole-number-above-minimum';
import { mockErrors } from '../../../../../../../test-mocks';

const { MINIMUM } = APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
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

describe('controllers/insurance/policy/single-contract-policy//total-contract-value/validation/rules/total-contract-value', () => {
  it('should return the result of wholeNumberAboveMinimumValidation', () => {
    const mockSubmittedData = {};

    const result = totalContractValueRules(mockSubmittedData, mockErrors);

    const expected = wholeNumberAboveMinimumValidation(mockSubmittedData, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MINIMUM);

    expect(result).toEqual(expected);
  });
});

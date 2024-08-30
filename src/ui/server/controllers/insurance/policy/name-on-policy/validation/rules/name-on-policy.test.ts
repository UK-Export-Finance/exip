import nameOnPolicyRule from './name-on-policy';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../test-mocks';

const {
  NAME_ON_POLICY: { NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/name-on-policy/validation/rules/name-on-policy', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = nameOnPolicyRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});

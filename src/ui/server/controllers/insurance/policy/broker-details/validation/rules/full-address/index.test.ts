import fullAddress, { MAXIMUM } from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  BROKER_DETAILS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/broker-details/validation/rules/full-address', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of providedAndMaxLength', () => {
    const result = fullAddress(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM);

    expect(result).toEqual(expected);
  });
});

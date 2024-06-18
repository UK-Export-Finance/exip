import brokerName from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  BROKER_DETAILS: { NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/broker-details/validation/rules/name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of providedAndMaxLength', () => {
    const result = brokerName(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.BROKER_NAME);

    expect(result).toEqual(expected);
  });
});

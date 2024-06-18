import fullBrokerAddress from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import fullAddressValidation from '../../../../../../../shared-validation/full-address';
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

  it('should return the result of fullAddressValidation', () => {
    const result = fullBrokerAddress(mockBody, mockErrors);

    const expected = fullAddressValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(result).toEqual(expected);
  });
});

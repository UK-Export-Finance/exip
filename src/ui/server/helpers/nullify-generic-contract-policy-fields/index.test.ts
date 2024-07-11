import nullifyGenericContractPolicyFields from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  CONTRACT_POLICY: { POLICY_CURRENCY_CODE, REQUESTED_START_DATE },
} = FIELD_IDS;

describe('server/helpers/nullify-generic-contract-policy-fields', () => {
  it('should return an object with empty fields', () => {
    const mockFormBody = { mock: true };

    const result = nullifyGenericContractPolicyFields(mockFormBody);

    const expected = {
      ...mockFormBody,
      [REQUESTED_START_DATE]: null,
      [POLICY_CURRENCY_CODE]: '',
    };

    expect(result).toEqual(expected);
  });
});

import nullifySingleContractPolicyFields from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

describe('server/helpers/nullify-single-contract-policy-fields', () => {
  it('should return an object with empty fields', () => {
    const mockFormBody = { mock: true };

    const result = nullifySingleContractPolicyFields(mockFormBody);

    const expected = {
      ...mockFormBody,
      [CONTRACT_COMPLETION_DATE]: null,
      [TOTAL_CONTRACT_VALUE]: '',
    };

    expect(result).toEqual(expected);
  });
});

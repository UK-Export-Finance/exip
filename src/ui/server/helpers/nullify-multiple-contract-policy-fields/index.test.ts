import nullifyMultipleContractPolicyFields from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

describe('server/helpers/nullify-multiple-contract-policy-fields', () => {
  it('should return an object with empty fields', () => {
    const mockFormBody = { mock: true };

    const result = nullifyMultipleContractPolicyFields(mockFormBody);

    const expected = {
      ...mockFormBody,
      [MAXIMUM_BUYER_WILL_OWE]: null,
      [TOTAL_MONTHS_OF_COVER]: null,
      [TOTAL_SALES_TO_BUYER]: null,
    };

    expect(result).toEqual(expected);
  });
});

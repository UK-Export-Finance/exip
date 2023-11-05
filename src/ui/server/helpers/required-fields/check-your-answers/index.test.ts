import requiredFields from '.';
import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyFields from '../policy';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import flattenApplicationData from '../../flatten-application-data';
import { mockApplication } from '../../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

describe('server/helpers/required-fields/check-your-answers', () => {
  it('should return array of required fields', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);

    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredEligibilityFields(),
      ...requiredPolicyFields(flatApplicationData[POLICY_TYPE]),
      ...requiredBusinessFields(),
      ...requiredYourBuyerFields(),
    ];

    expect(result).toEqual(expected);
  });
});

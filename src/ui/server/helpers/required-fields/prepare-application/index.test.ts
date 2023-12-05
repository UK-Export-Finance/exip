import requiredFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyFields from '../policy';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import flattenApplicationData from '../../flatten-application-data';
import { mockApplication } from '../../../test-mocks';

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    BROKER: { USING_BROKER },
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME },
  },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/required-fields/section-review', () => {
  it('should return array of required fields', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);

    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredEligibilityFields(),
      ...requiredPolicyFields({
        policyType: flatApplicationData[POLICY_TYPE],
        isUsingBroker: flatApplicationData[USING_BROKER],
      }),
      ...requiredBusinessFields(flatApplicationData[HAS_DIFFERENT_TRADING_NAME]),
      ...requiredYourBuyerFields(),
    ];

    expect(result).toEqual(expected);
  });
});

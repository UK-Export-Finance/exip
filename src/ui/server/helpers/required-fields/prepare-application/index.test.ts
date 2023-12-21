import requiredFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyFields from '../policy';
import requiredExportContractFields from '../export-contract';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import flattenApplicationData from '../../flatten-application-data';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION_KNOWN },
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    BROKER: { USING_BROKER },
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME },
  },
  YOUR_BUYER: {
    WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER },
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
      ...requiredExportContractFields({
        finalDestinationKnown: flatApplicationData[FINAL_DESTINATION_KNOWN],
      }),
      ...requiredBusinessFields(flatApplicationData[HAS_DIFFERENT_TRADING_NAME]),
      ...requiredYourBuyerFields(flatApplicationData[CONNECTED_WITH_BUYER]),
    ];

    expect(result).toEqual(expected);
  });
});

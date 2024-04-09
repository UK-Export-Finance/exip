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
    PRIVATE_MARKET: { ATTEMPTED },
    USING_AGENT,
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    USING_BROKER,
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME },
  },
  YOUR_BUYER: { CONNECTION_WITH_BUYER, OUTSTANDING_PAYMENTS, TRADED_WITH_BUYER, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/required-fields/section-review', () => {
  it('should return array of required fields', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);
    const { totalContractValueOverThreshold } = flatApplicationData;

    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredEligibilityFields(),
      ...requiredPolicyFields({
        policyType: flatApplicationData[POLICY_TYPE],
        isUsingBroker: flatApplicationData[USING_BROKER],
      }),
      ...requiredExportContractFields({
        finalDestinationKnown: flatApplicationData[FINAL_DESTINATION_KNOWN],
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover: flatApplicationData[ATTEMPTED],
        isUsingAgent: flatApplicationData[USING_AGENT],
      }),
      ...requiredBusinessFields(flatApplicationData[HAS_DIFFERENT_TRADING_NAME]),
      ...requiredYourBuyerFields({
        connectionWithBuyer: flatApplicationData[CONNECTION_WITH_BUYER],
        tradedWithBuyer: flatApplicationData[TRADED_WITH_BUYER],
        outstandingPayments: flatApplicationData[OUTSTANDING_PAYMENTS],
        hasPreviousCreditInsuranceWithBuyer: flatApplicationData[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
        totalContractValueOverThreshold,
      }),
    ];

    expect(result).toEqual(expected);
  });
});

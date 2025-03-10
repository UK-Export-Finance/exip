import requiredFields from '.';
import requiredBusinessFields from '../business';
import requiredEligibilityFields from '../eligibility';
import requiredExportContractFields from '../export-contract';
import requiredPolicyFields from '../policy';
import requiredYourBuyerFields from '../your-buyer';
import flattenApplicationData from '../../flatten-application-data';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION_KNOWN },
    PRIVATE_MARKET: { ATTEMPTED },
    USING_AGENT,
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME },
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    USING_BROKER,
    BROKER_DETAILS: { IS_BASED_IN_UK },
    BROKER_MANUAL_ADDRESS: { BROKER_FULL_ADDRESS },
    REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
    LOSS_PAYEE: { IS_APPOINTED },
    LOSS_PAYEE_DETAILS: { IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
  },
  YOUR_BUYER: { CONNECTION_WITH_BUYER, OUTSTANDING_PAYMENTS, TRADED_WITH_BUYER, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/required-fields/check-your-answers', () => {
  it('should return array of required fields', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);
    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredEligibilityFields(),
      ...requiredPolicyFields({
        policyType: flatApplicationData[POLICY_TYPE],
        jointlyInsuredParty: flatApplicationData[REQUESTED],
        isUsingBroker: flatApplicationData[USING_BROKER],
        brokerIsBasedInUk: flatApplicationData[IS_BASED_IN_UK],
        brokerFullAddress: flatApplicationData[BROKER_FULL_ADDRESS],
        isAppointingLossPayee: flatApplicationData[IS_APPOINTED],
        lossPayeeIsLocatedInUk: flatApplicationData[IS_LOCATED_IN_UK],
        lossPayeeIsLocatedInternationally: flatApplicationData[IS_LOCATED_INTERNATIONALLY],
      }),
      ...requiredExportContractFields({
        finalDestinationKnown: flatApplicationData[FINAL_DESTINATION_KNOWN],
        totalContractValueOverThreshold: flatApplicationData.totalContractValueOverThreshold,
        attemptedPrivateMarketCover: flatApplicationData[ATTEMPTED],
        isUsingAgent: flatApplicationData[USING_AGENT],
        awardMethodId: flatApplicationData[AWARD_METHOD]?.id,
      }),
      ...requiredBusinessFields(flatApplicationData[HAS_DIFFERENT_TRADING_NAME]),
      ...requiredYourBuyerFields({
        connectionWithBuyer: flatApplicationData[CONNECTION_WITH_BUYER],
        tradedWithBuyer: flatApplicationData[TRADED_WITH_BUYER],
        outstandingPayments: flatApplicationData[OUTSTANDING_PAYMENTS],
        hasPreviousCreditInsuranceWithBuyer: flatApplicationData[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
        totalContractValueOverThreshold: flatApplicationData.totalContractValueOverThreshold,
      }),
    ];

    expect(result).toEqual(expected);
  });
});

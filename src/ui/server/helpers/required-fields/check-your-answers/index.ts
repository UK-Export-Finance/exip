import requiredBusinessFields from '../business';
import requiredEligibilityFields from '../eligibility';
import requiredExportContractFields from '../export-contract';
import requiredPolicyFields from '../policy';
import requiredYourBuyerFields from '../your-buyer';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { ApplicationFlat } from '../../../../types';

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

/**
 * Required fields for the insurance - check your answers section
 * @param {ApplicationFlat} application
 * @returns {Array<string>} Array of tasks/field IDs
 */
const requiredFields = (application: ApplicationFlat): Array<string> => [
  ...requiredEligibilityFields(),
  ...requiredPolicyFields({
    policyType: application[POLICY_TYPE],
    jointlyInsuredParty: application[REQUESTED],
    isUsingBroker: application[USING_BROKER],
    brokerIsBasedInUk: application[IS_BASED_IN_UK],
    brokerFullAddress: application[BROKER_FULL_ADDRESS],
    isAppointingLossPayee: application[IS_APPOINTED],
    lossPayeeIsLocatedInUk: application[IS_LOCATED_IN_UK],
    lossPayeeIsLocatedInternationally: application[IS_LOCATED_INTERNATIONALLY],
  }),
  ...requiredExportContractFields({
    finalDestinationKnown: application[FINAL_DESTINATION_KNOWN],
    totalContractValueOverThreshold: application.totalContractValueOverThreshold,
    attemptedPrivateMarketCover: application[ATTEMPTED],
    isUsingAgent: application[USING_AGENT],
    awardMethodId: application[AWARD_METHOD]?.id,
  }),
  ...requiredBusinessFields(application[HAS_DIFFERENT_TRADING_NAME]),
  ...requiredYourBuyerFields({
    connectionWithBuyer: application[CONNECTION_WITH_BUYER],
    tradedWithBuyer: application[TRADED_WITH_BUYER],
    outstandingPayments: application[OUTSTANDING_PAYMENTS],
    hasPreviousCreditInsuranceWithBuyer: application[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
    totalContractValueOverThreshold: application.totalContractValueOverThreshold,
  }),
];

export default requiredFields;

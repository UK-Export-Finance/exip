import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyFields from '../policy';
import requiredExportContractFields from '../export-contract';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import { ApplicationFlat } from '../../../../types';

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

/**
 * Required fields for the insurance - check your answers section
 * @returns {Array} Required field IDs
 */
const requiredFields = (application: ApplicationFlat): Array<string> => [
  ...requiredEligibilityFields(),
  ...requiredPolicyFields({
    policyType: application[POLICY_TYPE],
    isUsingBroker: application[USING_BROKER],
  }),
  ...requiredExportContractFields({
    finalDestinationKnown: application[FINAL_DESTINATION_KNOWN],
    totalContractValueOverThreshold: application.totalContractValueOverThreshold,
    attemptedPrivateMarketCover: application[ATTEMPTED],
    isUsingAgent: application[USING_AGENT],
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

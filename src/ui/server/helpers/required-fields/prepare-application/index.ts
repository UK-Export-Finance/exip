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
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    USING_BROKER,
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME },
  },
  YOUR_BUYER: { CONNECTION_WITH_BUYER },
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
  }),
  ...requiredBusinessFields(application[HAS_DIFFERENT_TRADING_NAME]),
  ...requiredYourBuyerFields(application[CONNECTION_WITH_BUYER]),
];

export default requiredFields;

import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyFields from '../policy';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import { ApplicationFlat } from '../../../../types';

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    BROKER: { USING_BROKER },
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME },
  },
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
  ...requiredBusinessFields(application[HAS_DIFFERENT_TRADING_NAME]),
  ...requiredYourBuyerFields(),
];

export default requiredFields;

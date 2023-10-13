import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyFields from '../policy';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import { ApplicationFlat } from '../../../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

/**
 * Required fields for the insurance - check your answers section
 * @param {Array} Required field IDs
 */
const requiredFields = (application: ApplicationFlat): Array<string> => [
  ...requiredEligibilityFields(),
  ...requiredPolicyFields(application[POLICY_TYPE]),
  ...requiredBusinessFields(),
  ...requiredYourBuyerFields(),
];

export default requiredFields;

import POLICY_AND_EXPORT_FIELD_IDS from '../../../constants/field-ids/insurance/policy-and-exports';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyAndExportFields from '../policy-and-exports';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import { ApplicationFlat } from '../../../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_AND_EXPORT_FIELD_IDS;

/**
 * Required fields for the insurance - check your answers section
 * @returns {Array} Required field IDs
 */
const requiredFields = (application: ApplicationFlat): Array<string> => [
  ...requiredEligibilityFields(),
  ...requiredPolicyAndExportFields(application[POLICY_TYPE]),
  ...requiredBusinessFields(),
  ...requiredYourBuyerFields(),
];

export default requiredFields;

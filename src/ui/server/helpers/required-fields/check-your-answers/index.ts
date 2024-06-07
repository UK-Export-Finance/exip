import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import requiredBusinessFields from '../business';
import requiredSectionReviewFields from '../section-review';
import requiredEligibilityFields from '../eligibility';
import requiredExportContractFields from '../export-contract';
import requiredPolicyFields from '../policy';
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
  ...requiredBusinessFields(),
  ...requiredEligibilityFields(),
  ...requiredExportContractFields(application),
  ...requiredPolicyFields(application[POLICY_TYPE]),
  ...requiredSectionReviewFields,
  ...requiredYourBuyerFields({}),
];

export default requiredFields;

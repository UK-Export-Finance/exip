import requiredBusinessFields from '../business';
import requiredSectionReviewFields from '../section-review';
import requiredEligibilityFields from '../eligibility';
import requiredExportContractFields from '../export-contract';
import requiredPolicyFields from '../policy';
import requiredYourBuyerFields from '../your-buyer';
import { ApplicationFlat } from '../../../../types';

/**
 * Required fields for the insurance - check your answers section
 * @param {ApplicationFlat} application
 * @returns {Array<string>} Array of tasks/field IDs
 */
const requiredFields = (application: ApplicationFlat): Array<string> => [
  ...requiredBusinessFields(),
  ...requiredEligibilityFields(),
  ...requiredExportContractFields(application),
  ...requiredPolicyFields(application),
  ...requiredSectionReviewFields(),
  ...requiredYourBuyerFields({}),
];

export default requiredFields;

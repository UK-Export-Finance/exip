import FIELD_IDS from '../../constants/field-ids/insurance';
import requiredEligibilityFields from './eligibility';
import requiredPolicyAndExportFields from './policy-and-exports';
import requiredExporterBusinessFields from './exporter-business';
import requiredYourBuyerFields from './your-buyer';
import requiredSectionReviewFields from './section-review';
import requiredDeclarationsFields from './declarations';
import { ApplicationFlat } from '../../../types';

const {
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
} = FIELD_IDS;

/**
 * Required fields for an application
 * @param {Object} Application
 * @returns {Array} Required field IDs
 */
const requiredFields = (application: ApplicationFlat) => [
  ...requiredEligibilityFields(),
  ...requiredPolicyAndExportFields(application[POLICY_TYPE]),
  ...requiredExporterBusinessFields(),
  ...requiredYourBuyerFields(),
  ...requiredSectionReviewFields(application),
  ...requiredDeclarationsFields(application[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]),
];

export default requiredFields;

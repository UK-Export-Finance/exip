import FIELD_IDS from '../../constants/field-ids/insurance';
import { getSubmittedFields } from '../get-submitted-fields';
import requiredEligibilityFields from '../required-fields/eligibility';
import requiredPolicyAndExportFields from '../required-fields/policy-and-exports';
import requiredExporterBusinessFields from '../required-fields/exporter-business';
import requiredYourBuyerFields from '../required-fields/your-buyer';
import requiredSectionReviewFields from '../required-fields/section-review';
import requiredDeclarationsFields from '../required-fields/declarations';
import { ApplicationFlat } from '../../../types';

const {
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
} = FIELD_IDS;

/**
 * applicationIsComplete
 * Check if the application is complete and has a draft status
 * @param {Object} Application
 * @returns {Boolean}
 */
const applicationIsComplete = (application: ApplicationFlat) => {
  const requiredFieldIds = [
    ...requiredEligibilityFields(),
    ...requiredPolicyAndExportFields(application[POLICY_TYPE]),
    ...requiredExporterBusinessFields(),
    ...requiredYourBuyerFields(),
    ...requiredSectionReviewFields(application),
    ...requiredDeclarationsFields(application[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]),
  ];

  const submittedFieldIds = getSubmittedFields(requiredFieldIds, application);

  if (requiredFieldIds.length === submittedFieldIds.length) {
    return true;
  }

  return false;
};

export default applicationIsComplete;

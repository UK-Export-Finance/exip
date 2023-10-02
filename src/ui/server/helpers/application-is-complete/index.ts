import FIELD_IDS from '../../constants/field-ids/insurance';
import { getSubmittedFields } from '../get-submitted-fields';
import requiredPrepareApplicationFields from '../required-fields/prepare-application';
import requiredDeclarationsFields from '../required-fields/declarations';
import { ApplicationFlat } from '../../../types';

const {
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
} = FIELD_IDS;

/**
 * applicationIsComplete
 * Check if the application is complete
 * @param {Application}
 * @returns {Boolean}
 */
const applicationIsComplete = (application: ApplicationFlat) => {
  const requiredFieldIds = [...requiredPrepareApplicationFields(application), ...requiredDeclarationsFields(application[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT])];

  const submittedFieldIds = getSubmittedFields(requiredFieldIds, application);

  if (requiredFieldIds.length === submittedFieldIds.length) {
    return true;
  }

  return false;
};

export default applicationIsComplete;

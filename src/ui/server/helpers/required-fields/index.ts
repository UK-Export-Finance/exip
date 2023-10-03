import FIELD_IDS from '../../constants/field-ids/insurance';
import requiredPrepareApplicationFields from './prepare-application';
import requiredCheckYourAnswersFields from './check-your-answers';
import requiredDeclarationsFields from './declarations';
import { ApplicationFlat } from '../../../types';

const {
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
} = FIELD_IDS;

/**
 * Required fields for an application
 * @param {Application}
 * @returns {Array} Required field IDs
 */
const requiredFields = (application: ApplicationFlat) => [
  ...requiredPrepareApplicationFields(application),
  ...requiredCheckYourAnswersFields(application),
  ...requiredDeclarationsFields(application[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]),
];

export default requiredFields;

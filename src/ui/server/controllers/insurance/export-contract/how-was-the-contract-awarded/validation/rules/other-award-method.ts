import { EXPORT_CONTRACT_AWARD_METHOD, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { [OTHER_AWARD_METHOD]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * otherAwardMethodRule
 * if AWARD_METHOD is "OTHER", return providedAndMaxLength for the OTHER_AWARD_METHOD field.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const otherAwardMethodRule = (formBody: RequestBody, errors: object) => {
  if (formBody[AWARD_METHOD] === EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID) {
    return providedAndMaxLength(formBody, OTHER_AWARD_METHOD, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.EXPORT_CONTRACT.OTHER_AWARD_METHOD);
  }

  return errors;
};

export default otherAwardMethodRule;

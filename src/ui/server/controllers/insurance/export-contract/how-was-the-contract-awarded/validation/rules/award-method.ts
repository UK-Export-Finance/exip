import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: FIELD_ID },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * awardMethodRule
 * Returns emptyFieldValidation for the AWARD_METHOD field.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const awardMethodRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, errors);

export default awardMethodRule;

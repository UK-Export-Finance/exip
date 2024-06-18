import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_SERVICE: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

/**
 * validate the "agent is charging" field
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} emptyFieldValidation
 */
const isCharging = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE, errors);

export default isCharging;

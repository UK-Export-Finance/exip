import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  DIFFERENT_NAME_ON_POLICY: { POSITION: FIELD_ID },
} = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validates position field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} errors
 */
const position = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default position;

import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "broker is based in UK" field
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors} emptyFieldValidation
 */
const isBasedInUkRules = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default isBasedInUkRules;

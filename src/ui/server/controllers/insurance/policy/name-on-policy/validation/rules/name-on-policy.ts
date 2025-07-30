import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  NAME_ON_POLICY: { NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * nameOnPolicyRule
 * Returns the result of emptyFieldValidation
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const nameOnPolicyRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default nameOnPolicyRule;

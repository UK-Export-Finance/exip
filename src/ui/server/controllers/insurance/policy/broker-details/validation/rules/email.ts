import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emailValidation from '../../../../../../shared-validation/email';
import { RequestBody } from '../../../../../../../types';

const {
  BROKER_DETAILS: { EMAIL: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validates email field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} errors
 */
const email = (formBody: RequestBody, errors: object) => emailValidation(FIELD_ID, formBody[FIELD_ID], ERROR_MESSAGES_OBJECT, errors);

export default email;

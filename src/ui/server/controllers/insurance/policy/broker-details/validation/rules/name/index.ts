import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "broker name" field
 * @param {Express.Request.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const brokerName = (responseBody: RequestBody, errors: object) =>
  providedAndMaxLength(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.BROKER_NAME);

export default brokerName;

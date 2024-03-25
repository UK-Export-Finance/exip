import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import fullAddressValidation from '../../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "full address" field
 * @param {Express.Request.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Function} fullAddressValidation
 */
const fullBrokerAddress = (responseBody: RequestBody, errors: object) => fullAddressValidation(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default fullBrokerAddress;

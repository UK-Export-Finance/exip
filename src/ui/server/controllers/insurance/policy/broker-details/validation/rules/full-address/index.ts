import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import fullAddress from '../../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "full address" in the "broker details" request body
 * @param {Express.Request.body} responseBody: containing an object with broker form submission data
 * @param {Object} errors: errorList
 * @returns {Object} fullAddress
 */
const fullBrokerAddress = (responseBody: RequestBody, errors: object) => fullAddress(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default fullBrokerAddress;

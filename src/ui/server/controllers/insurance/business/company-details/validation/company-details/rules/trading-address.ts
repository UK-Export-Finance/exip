import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import fullAddressValidation from '../../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../../types';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validate the "tradingAddress" in "company details" request body
 * throws validation errors if there is no tradingAddress property
 * @param {Express.Request.body} formBody: containing an object with the company details response
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Function} fullAddressValidation
 */
const tradingAddress = (responseBody: RequestBody, errors: object) => fullAddressValidation(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default tradingAddress;

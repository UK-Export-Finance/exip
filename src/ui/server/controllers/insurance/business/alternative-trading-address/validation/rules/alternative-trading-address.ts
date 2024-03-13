import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import fullAddress from '../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../types';

const { FULL_ADDRESS: FIELD_ID } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validate the "alternative address" in the "business" request body
 * @param {Express.Request.body} responseBody: containing an object with broker form submission data
 * @param {Object} errors: errorList
 * @returns {Object} fullAddress
 */
const alternativeTradingAddress = (responseBody: RequestBody, errors: object) => fullAddress(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default alternativeTradingAddress;

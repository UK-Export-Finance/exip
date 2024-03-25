import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import fullAddressValidation from '../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../types';

const { FULL_ADDRESS: FIELD_ID } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validate the "alternative address" field
 * @param {Express.Request.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} fullAddressValidation
 */
const alternativeTradingAddress = (responseBody: RequestBody, errors: object) => fullAddressValidation(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default alternativeTradingAddress;

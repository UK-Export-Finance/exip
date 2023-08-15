import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_NAME: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS: ERROR_MESSAGE } = ERROR_MESSAGES.INSURANCE;

/**
 * validates tradingName in company details response body
 * throws validation errors if there is no tradingName property
 * @param {Express.Request.body} responseBody containing an object with the company details response
 * @param {Object} errors errorList
 * @returns {object} object containing errors or blank object
 */
const tradingName = (responseBody: RequestBody, errors: object) => emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default tradingName;

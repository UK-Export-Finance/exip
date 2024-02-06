import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_ADDRESS: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

const ERROR_MESSAGE = EXPORTER_BUSINESS[FIELD_ID];

/**
 * validates tradingAddress in company details response body
 * throws validation errors if there is no tradingAddress property
 * @param {Express.Request.body} responseBody containing an object with the company details response
 * @param {Object} errors errorList
 * @returns {object} object containing errors or blank object
 */
const tradingAddress = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default tradingAddress;

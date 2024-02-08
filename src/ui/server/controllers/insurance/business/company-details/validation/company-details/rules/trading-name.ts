import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

const ERROR_MESSAGE = EXPORTER_BUSINESS[FIELD_ID];

/**
 * validates tradingName in company details response body
 * throws validation errors if there is no tradingName property
 * @param {Express.Request.body} formBody: containing an object with the company details response
 * @param {Object} errors: errorList
 * @returns {Object} Errors or empty object
 */
const tradingName = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default tradingName;

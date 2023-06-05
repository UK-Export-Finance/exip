import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_NAME },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates tradingName in company details response body
 * throws validation errors if there is no tradingName property
 * @param {Express.Request.body} responseBody containing an object with the company details response
 * @param {Object} errors errorList
 * @returns {object} object containing errors or blank object
 */
const tradingName = (responseBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  // if no tradingName in response
  if (!responseBody[TRADING_NAME]) {
    const errorMessage = EXPORTER_BUSINESS[TRADING_NAME].IS_EMPTY;
    updatedErrors = generateValidationErrors(TRADING_NAME, errorMessage, errors);
  }

  return updatedErrors;
};

export default tradingName;

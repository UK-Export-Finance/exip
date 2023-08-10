import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import { objectHasProperty } from '../../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_ADDRESS },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates tradingAddress in company details response body
 * throws validation errors if there is no tradingAddress property
 * @param {Express.Request.body} responseBody containing an object with the company details response
 * @param {Object} errors errorList
 * @returns {object} object containing errors or blank object
 */
const tradingAddress = (responseBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (!objectHasProperty(responseBody, TRADING_ADDRESS)) {
    const errorMessage = EXPORTER_BUSINESS[TRADING_ADDRESS].IS_EMPTY;
    updatedErrors = generateValidationErrors(TRADING_ADDRESS, errorMessage, errors);
  }

  return updatedErrors;
};

export default tradingAddress;

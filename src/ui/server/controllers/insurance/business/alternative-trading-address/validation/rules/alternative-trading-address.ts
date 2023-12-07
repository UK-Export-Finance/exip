import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import inputValidation from '../../../../../../shared-validation/max-length';

const { FULL_ADDRESS: FIELD_ID } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

export const MAXIMUM = 1000;

/**
 * validates alternative trading address input
 * errors if empty or more than 1000 characters
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const alternativeTradingAddress = (responseBody: RequestBody, errors: object) => {
  // if body is empty
  if (!objectHasProperty(responseBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return inputValidation(responseBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors, MAXIMUM);
};

export default alternativeTradingAddress;

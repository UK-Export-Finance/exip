import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

export const MAXIMUM = 1000;

/**
 * validates goods or services input
 * errors if empty or more than 1000 characters
 * @param {RequestBody} formBody
 * @param {object} errors
 * @returns {object} errors
 */
const goodsOrServices = (formBody: RequestBody, errors: object) => {
  // if body is empty
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  // check if the field is above the maximum
  if (formBody[FIELD_ID].length > MAXIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return errors;
};

export default goodsOrServices;

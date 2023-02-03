import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import { isNumberAboveMaximum, isNumberBelowMinimum } from '../../../../../../helpers/number';
import { stripCommas } from '../../../../../../helpers/string';

const {
  TURNOVER: { PERCENTAGE_TURNOVER: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

const MINIMUM = 0;
const MAXIMUM = 100;

/**
 * validates percentage turnover
 * only numbers without decimals or special characters
 * only allows numbers between 0 and 100
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const percentageTurnover = (responseBody: RequestBody, errors: object) => {
  let updatedErrors = errors;
  const value = responseBody[FIELD_ID];

  if (!objectHasProperty(responseBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  // removes any commas from number
  const numberWithoutCommas = stripCommas(value);

  /**
   * checks if number does not have any special characters or decimal places
   * However, only if number is 0 or above
   * If number is below 0, then different error message is required
   */
  if (!isNumberBelowMinimum(Number(numberWithoutCommas), 0)) {
    const wholeNumberErrorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
    updatedErrors = wholeNumberValidation(responseBody, updatedErrors, wholeNumberErrorMessage, FIELD_ID);
  }

  // checks if number is below 0 and returns different error message
  if (isNumberBelowMinimum(Number(numberWithoutCommas), MINIMUM)) {
    const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;

    return generateValidationErrors(FIELD_ID, errorMessage, updatedErrors);
  }

  // checks if number is above 100
  if (isNumberAboveMaximum(Number(numberWithoutCommas), MAXIMUM)) {
    const errorMessage = ERROR_MESSAGE.ABOVE_MAXIMUM;

    return generateValidationErrors(FIELD_ID, errorMessage, updatedErrors);
  }

  return updatedErrors;
};

export default percentageTurnover;

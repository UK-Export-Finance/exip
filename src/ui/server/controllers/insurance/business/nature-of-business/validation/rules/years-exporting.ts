import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import { isNumber, numberHasDecimal, isNumberBelowMinimum } from '../../../../../../helpers/number';

const {
  NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates years exporting input
 * only allows number without decimal
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const yearsExporting = (responseBody: RequestBody, errors: object) => {
  // if body is empty
  if (!objectHasProperty(responseBody, YEARS_EXPORTING)) {
    const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].IS_EMPTY;

    return generateValidationErrors(YEARS_EXPORTING, errorMessage, errors);
  }

  const hasDecimal = numberHasDecimal(Number(responseBody[YEARS_EXPORTING]));
  const isBelowMinimum = isNumberBelowMinimum(Number(responseBody[YEARS_EXPORTING]), 0);
  // if it isn't a number or has a decimal place, then will return an error
  if (!isNumber(responseBody[YEARS_EXPORTING]) || hasDecimal || isBelowMinimum) {
    const errorMessage = EXPORTER_BUSINESS[YEARS_EXPORTING].INCORRECT_FORMAT;

    return generateValidationErrors(YEARS_EXPORTING, errorMessage, errors);
  }

  return errors;
};

export default yearsExporting;

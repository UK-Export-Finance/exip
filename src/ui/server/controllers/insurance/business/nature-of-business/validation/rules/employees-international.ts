import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import { isNumberBelowMinimum } from '../../../../../../helpers/number';
import { stripCommas } from '../../../../../../helpers/string';

const {
  NATURE_OF_YOUR_BUSINESS: { EMPLOYEES_INTERNATIONAL: FIELD_ID, EMPLOYEES_UK },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

const MINIMUM = 1;

/**
 * validates  number of international employees input
 * only allows number without decimal
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const employeesInternational = (responseBody: RequestBody, errors: object) => {
  if (!objectHasProperty(responseBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  // value of EMPLOYEES_INTERNATIONAL
  const value = responseBody[FIELD_ID];
  const valueWithoutCommas = stripCommas(value);

  // checks if EMPLOYEES_INTERNATIONAL is less than EMPLOYEES_UK if it exists
  if (objectHasProperty(responseBody, EMPLOYEES_UK)) {
    const employeesUKValue = responseBody[EMPLOYEES_UK];
    const employeesUKWithoutCommas = stripCommas(employeesUKValue);

    if (isNumberBelowMinimum(Number(valueWithoutCommas), Number(employeesUKWithoutCommas))) {
      const errorMessage = ERROR_MESSAGE.BELOW_UK;

      return generateValidationErrors(FIELD_ID, errorMessage, errors);
    }
  }

  // checks if value is below set minimum
  if (isNumberBelowMinimum(Number(valueWithoutCommas), MINIMUM)) {
    const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
  // checks that it does not contain special characters
  return wholeNumberValidation(responseBody, errors, errorMessage, FIELD_ID);
};

export default employeesInternational;

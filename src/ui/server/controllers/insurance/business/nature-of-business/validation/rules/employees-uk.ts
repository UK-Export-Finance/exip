import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import { stripCommas } from '../../../../../../helpers/string';
import { isNumberBelowMinimum } from '../../../../../../helpers/number';

const {
  NATURE_OF_YOUR_BUSINESS: { EMPLOYEES_UK: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

const MINIMUM = 1;

/**
 * validates number of uk employees input
 * only allows number without decimal
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} errors
 */
const employeesUK = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  const value = formBody[FIELD_ID];
  const valueWithoutCommas = stripCommas(value);

  // checks if value is below set minimum
  if (isNumberBelowMinimum(Number(valueWithoutCommas), MINIMUM)) {
    const errorMessage = ERROR_MESSAGE.BELOW_MINIMUM;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
  return wholeNumberValidation(formBody, errors, errorMessage, FIELD_ID);
};

export default employeesUK;

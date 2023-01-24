import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  NATURE_OF_YOUR_BUSINESS: { EMPLOYEES_UK },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates number of uk employees input
 * only allows number without decimal
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const employeesUK = (responseBody: RequestBody, errors: object) => {
  if (!objectHasProperty(responseBody, EMPLOYEES_UK)) {
    const errorMessage = EXPORTER_BUSINESS[EMPLOYEES_UK].IS_EMPTY;

    return generateValidationErrors(EMPLOYEES_UK, errorMessage, errors);
  }

  return wholeNumberValidation(responseBody, errors, EXPORTER_BUSINESS, EMPLOYEES_UK);
};

export default employeesUK;

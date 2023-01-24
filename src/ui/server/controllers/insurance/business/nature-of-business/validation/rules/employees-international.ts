import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  NATURE_OF_YOUR_BUSINESS: { EMPLOYEES_INTERNATIONAL },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates  number of international employees input
 * only allows number without decimal
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const employeesInternational = (responseBody: RequestBody, errors: object) => {
  if (!objectHasProperty(responseBody, EMPLOYEES_INTERNATIONAL)) {
    const errorMessage = EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL].IS_EMPTY;

    return generateValidationErrors(EMPLOYEES_INTERNATIONAL, errorMessage, errors);
  }

  return wholeNumberValidation(responseBody, errors, EXPORTER_BUSINESS, EMPLOYEES_INTERNATIONAL);
};

export default employeesInternational;

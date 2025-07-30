import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import numberValidation from '../../../../../../helpers/number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates years exporting input
 * only allows number without decimal
 * @param {RequestBody} formBody
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} errors
 */
const yearsExporting = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
  return numberValidation({ formBody, errors, errorMessage, fieldId: FIELD_ID });
};

export default yearsExporting;

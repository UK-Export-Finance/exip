import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../../types';
import numberValidation from '../../../../../../helpers/number-validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates number of estimated annual turnover input
 * only allows number without decimal
 * @param {RequestBody} formBody
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} errors
 */
const estimatedAnnualTurnover = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    return generateValidationErrors(FIELD_ID, errorMessage, errors);
  }

  const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

  const allowNegativeValue = true;

  return numberValidation({ formBody, errors, errorMessage, fieldId: FIELD_ID, allowNegativeValue });
};

export default estimatedAnnualTurnover;

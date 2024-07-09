import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import nameValidation from '../../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../../types';

const { LAST_NAME: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * lastNameRules
 * Check submitted form data for errors with the last name field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors} nameValidation
 */
const lastNameRules = (formBody: RequestBody, errors: object) => nameValidation(formBody, FIELD_ID, ERROR_MESSAGE, errors);

export default lastNameRules;

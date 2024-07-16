import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import nameValidation from '../../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../../types';

const { FIRST_NAME: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * firstNameRules
 * Check submitted form data for errors with the first name field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const firstNameRules = (formBody: RequestBody, errors: object) => nameValidation(formBody, FIELD_ID, ERROR_MESSAGE, errors);

export default firstNameRules;

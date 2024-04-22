import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import isStringWithHttp from '../../../../../../helpers/is-string-with-http';
import validateWebsiteAddress from '../../../../../../shared-validation/website-address';
import { objectHasProperty } from '../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../types';

const {
  COMPANY_OR_ORGANISATION: { WEBSITE: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * websiteRule.
 * Check submitted form data for errors with the website field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const websiteRule = (formBody: RequestBody, errors: object) => {
  // only validate website if field is not empty
  if (objectHasProperty(formBody, FIELD_ID)) {
    // adds 'http://' to url for validation
    const url = isStringWithHttp(formBody[FIELD_ID]);

    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;
    // validates input
    return validateWebsiteAddress(url, FIELD_ID, errorMessage, errors);
  }

  return errors;
};

export default websiteRule;

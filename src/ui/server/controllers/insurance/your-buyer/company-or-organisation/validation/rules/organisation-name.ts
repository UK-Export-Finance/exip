import { MAXIMUM_CHARACTERS } from '../../../../../../constants/validation';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  COMPANY_OR_ORGANISATION: { NAME: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * companyOrOrganisationNameRules.
 * Check submitted form data for errors with the company/organisation name field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Errors object from previous validation errors
 * @returns {ValidationErrors} providedAndMaxLength
 */
const companyOrOrganisationNameRules = (formBody: RequestBody, errors: object) =>
  providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.BUYER.COMPANY_OR_ORGANISATION);

export default companyOrOrganisationNameRules;

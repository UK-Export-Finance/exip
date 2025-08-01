import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../../helpers/object';
import maxLengthValidation from '../../../../../../../shared-validation/max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NUMBER: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [FIELD_ID]: { ABOVE_MAXIMUM: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.POLICY;

const MAXIMUM = MAXIMUM_CHARACTERS.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER;

/**
 * validate the "company number" in other company details response body
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} Errors or empty object
 */
const companyNumber = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, FIELD_ID)) {
    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, errors, MAXIMUM);
  }

  return errors;
};

export default companyNumber;

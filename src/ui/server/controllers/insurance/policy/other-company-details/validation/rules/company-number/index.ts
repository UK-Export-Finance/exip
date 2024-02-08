import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
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

const MAXIMUM = Number(POLICY_FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[FIELD_ID].MAXIMUM);

/**
 * validate the "company number" in other company details response body
 * @param {Express.Request.body} formBody: containing an object with the company details response
 * @param {Object} errors: errorList
 * @returns {Object} Errors or empty object
 */
const companyNumber = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, FIELD_ID)) {
    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, errors, MAXIMUM);
  }

  return errors;
};

export default companyNumber;

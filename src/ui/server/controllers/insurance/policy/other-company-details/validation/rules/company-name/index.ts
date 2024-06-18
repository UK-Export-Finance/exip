import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(POLICY_FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[FIELD_ID].MAXIMUM);

/**
 * validate the "company name" in other company details response body
 * @param {RequestBody} formBody: containing an object with the company details response
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} Errors or empty object
 */
const companyName = (responseBody: RequestBody, errors: object) => providedAndMaxLength(responseBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);

export default companyName;

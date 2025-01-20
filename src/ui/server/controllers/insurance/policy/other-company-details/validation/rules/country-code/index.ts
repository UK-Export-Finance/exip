import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COUNTRY_CODE: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "country" in other company details response body
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors}
 */
const countryCode = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE, errors);

export default countryCode;

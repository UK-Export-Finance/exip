import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COUNTRY: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "country" in other company details response body
 * @param {Express.Request.body} responseBody containing an object with the company details response
 * @param {Object} errors errorList
 * @returns {object} object containing errors or blank object
 */
const country = (responseBody: RequestBody, errors: object) => emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE, errors);

export default country;

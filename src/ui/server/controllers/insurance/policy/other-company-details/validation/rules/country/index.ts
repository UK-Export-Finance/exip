import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  OTHER_COMPANY_TO_INSURE_NAME_TBC: { COUNTRY: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  OTHER_COMPANY_TO_INSURE_NAME_TBC: {
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

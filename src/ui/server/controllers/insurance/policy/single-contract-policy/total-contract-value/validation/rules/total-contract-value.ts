import { APPLICATION } from '../../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import wholeNumberAboveMinimumValidation from '../../../../../../../shared-validation/whole-number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const { MINIMUM } = APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

/**
 * totalContractValueRules
 * Check submitted form data for errors with the total contract value field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalContractValueRules = (formBody: RequestBody, errors: object) =>
  wholeNumberAboveMinimumValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MINIMUM);

export default totalContractValueRules;

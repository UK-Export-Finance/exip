import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../content-strings';
import dateRules from '../date';
import { RequestBody } from '../../../types';

const {
  CONTRACT_POLICY: { REQUESTED_START_DATE: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * requestedStartDateRules
 * Requested start date validation rules
 * @param {RequestBody} formBody
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} Result of dateRules
 */
const requestedStartDateRules = (formBody: RequestBody, errors: object) => {
  const rules = dateRules({
    formBody,
    errors,
    fieldId: FIELD_ID,
    errorMessages: ERROR_MESSAGES_OBJECT,
  });

  return rules;
};

export default requestedStartDateRules;

import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import postcodeValidation from '../../../../../../../shared-validation/postcode';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, POSTCODE: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "broker postcode" field
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Errors from previous validation errors
 * @returns {ValidationErrors} postcodeValidation
 */
const postcodeRules = (formBody: RequestBody, errors: object) => {
  if (formBody[IS_BASED_IN_UK] === 'true') {
    return postcodeValidation(FIELD_ID, formBody[FIELD_ID], ERROR_MESSAGE.IS_EMPTY, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  return errors;
};

export default postcodeRules;

import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, BUILDING_NUMBER_OR_NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validate the "broker building number or name" field
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Errors from previous validation errors
 * @returns {ValidationErrors} providedAndMaxLength
 */
const buildingNumberOrNameRules = (formBody: RequestBody, errors: object) => {
  if (formBody[IS_BASED_IN_UK] === 'true') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.BROKER_BUILDING_NUMBER_OR_NAME);
  }

  return errors;
};

export default buildingNumberOrNameRules;

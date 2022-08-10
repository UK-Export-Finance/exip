import { FIELD_IDS } from '../../../../constants';
import { ERROR_MESSAGES } from '../../../../content-strings';
import generateValidationErrors from '../../../../helpers/validation';
import { objectHasProperty } from '../../../../helpers/object';
import { RequestBody } from '../../../../../types';

const policyTypeRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.POLICY_TYPE)) {
    updatedErrors = generateValidationErrors(FIELD_IDS.SINGLE_POLICY_TYPE, ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE], errors);
  }

  return updatedErrors;
};

export default policyTypeRules;

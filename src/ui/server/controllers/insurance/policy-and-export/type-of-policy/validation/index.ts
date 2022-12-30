import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasValues, objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { RequestBody } from '../../../../../../types';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const FIELD_ID = POLICY_AND_EXPORTS.POLICY_TYPE;

const validation = (formBody: RequestBody) => {
  let errors;

  const hasErrors = !objectHasValues(formBody) || !objectHasProperty(formBody, FIELD_ID);

  if (hasErrors) {
    errors = generateValidationErrors(POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE, ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS[FIELD_ID].IS_EMPTY);

    return errors;
  }

  return null;
};

export default validation;

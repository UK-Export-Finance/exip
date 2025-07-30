import { FIELD_VALUES, MINIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import percentageNumberValidation from '../../../../../../../helpers/percentage-number-validation';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE_METHOD: { PERCENTAGE },
  },
} = FIELD_VALUES;

const {
  AGENT_CHARGES: { METHOD, PERCENTAGE_CHARGE },
} = FIELD_IDS;

const {
  AGENT_CHARGES: { [METHOD]: METHOD_ERROR_MESSAGES, [PERCENTAGE_CHARGE]: PERCENTAGE_CHARGE_ERROR_MESSAGES },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

/**
 * validate the METHOD field
 * - If METHOD is PERCENTAGE, validate PERCENTAGE_CHARGE via percentageNumberValidation.
 * - Otherwise, assert empty field validation.
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Other validation errors for the same form
 * @returns {ValidationErrors}
 */
const method = (formBody: RequestBody, errors: object) => {
  if (formBody[METHOD] === PERCENTAGE) {
    return percentageNumberValidation(formBody, PERCENTAGE_CHARGE, errors, PERCENTAGE_CHARGE_ERROR_MESSAGES, MINIMUM_CHARACTERS.ONE);
  }

  return emptyFieldValidation(formBody, METHOD, METHOD_ERROR_MESSAGES.IS_EMPTY, errors);
};

export default method;

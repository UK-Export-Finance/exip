import { FIELD_VALUES, MINIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import percentageNumberValidation from '../../../../../../../helpers/percentage-number-validation';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE_METHOD: { FIXED_SUM, PERCENTAGE },
  },
} = FIELD_VALUES;

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE },
} = FIELD_IDS;

const {
  AGENT_CHARGES: {
    [METHOD]: METHOD_ERROR_MESSAGES,
    [FIXED_SUM_AMOUNT]: FIXED_SUM_AMOUNT_ERROR_MESSAGES,
    [PERCENTAGE_CHARGE]: PERCENTAGE_CHARGE_ERROR_MESSAGES,
  },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

/**
 * validate the METHOD field
 * - If METHOD is FIXED_SUM, validate FIXED_SUM_AMOUNT via numberAboveMinimumValidation.
 * - If METHOD is PERCENTAGE, validate PERCENTAGE_CHARGE via percentageNumberValidation.
 * - Otherwise, assert empty field validation.
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors}
 */
const method = (formBody: RequestBody, errors: object) => {
  if (formBody[METHOD] === FIXED_SUM) {
    return numberAboveMinimumValidation({
      formBody,
      fieldId: FIXED_SUM_AMOUNT,
      errorMessage: FIXED_SUM_AMOUNT_ERROR_MESSAGES,
      errors,
      minimum: MINIMUM_CHARACTERS.ONE,
      allowDecimalPlaces: true,
    });
  }

  if (formBody[METHOD] === PERCENTAGE) {
    return percentageNumberValidation(formBody, PERCENTAGE_CHARGE, errors, PERCENTAGE_CHARGE_ERROR_MESSAGES, MINIMUM_CHARACTERS.ONE);
  }

  return emptyFieldValidation(formBody, METHOD, METHOD_ERROR_MESSAGES.IS_EMPTY, errors);
};

export default method;

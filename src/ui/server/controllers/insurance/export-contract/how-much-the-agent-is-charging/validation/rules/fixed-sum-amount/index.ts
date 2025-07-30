import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_CHARGES: { [FIELD_ID]: FIXED_SUM_AMOUNT_ERROR_MESSAGES },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

/**
 * validate the FIXED_SUM_AMOUNT field via numberAboveMinimumValidation.
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Other validation errors for the same form
 * @returns {ValidationErrors}
 */
const fixedSumAmountRule = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({
    formBody,
    fieldId: FIELD_ID,
    errorMessage: FIXED_SUM_AMOUNT_ERROR_MESSAGES,
    errors,
    minimum: MINIMUM_CHARACTERS.ONE,
    allowDecimalPlaces: true,
  });

export default fixedSumAmountRule;

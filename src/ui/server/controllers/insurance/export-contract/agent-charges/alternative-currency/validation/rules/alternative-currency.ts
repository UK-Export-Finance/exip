import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import alternativeCurrencyValidation from '../../../../../../../shared-validation/alternative-currency';
import { RequestBody } from '../../../../../../../../types';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES_ALTERNATIVE_CURRENCY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * alternativeCurrencyRule
 * Returns alternativeCurrencyValidation for the ALTERNATIVE_CURRENCY_CODE field.
 * @param {RequestBody} formBody: Form body
 * * @param {Object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const alternativeCurrencyRule = (formBody: RequestBody, errors: object) => alternativeCurrencyValidation(formBody, errors, ERROR_MESSAGE.IS_EMPTY);

export default alternativeCurrencyRule;

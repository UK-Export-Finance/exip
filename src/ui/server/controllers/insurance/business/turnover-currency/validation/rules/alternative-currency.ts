import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import alternativeCurrencyValidation from '../../../../../../shared-validation/alternative-currency';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * alternativeCurrencyRule
 * Returns alternativeCurrencyValidation for the ALTERNATIVE_CURRENCY_CODE field.
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const alternativeCurrencyRule = (formBody: RequestBody, errors: object) => alternativeCurrencyValidation(formBody, errors, ERROR_MESSAGE.IS_EMPTY);

export default alternativeCurrencyRule;

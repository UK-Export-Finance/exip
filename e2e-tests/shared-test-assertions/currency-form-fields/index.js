import { FIELDS } from '../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import fieldAssertions from './assertions';

import renderingAssertions from './rendering';
import formSubmissionAssertions from './form-submission';
import prefixAssertions from './prefix';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * assertCurrencyFormFields
 * Assert currency form fields
 * @param {Function} completeNonCurrencyFieldsFunction: Optional function to complete non-currency form fields.
 * @param {Number} errorIndex: Index of the currency field error.
 * @param {Object} errors: Other validation errors for the same form
 * @param {String} fieldId: Field ID of input for prefix assertion
 * @param {Boolean} gbpCurrencyCheckedByDefault: GBP currency should be checked by default
 * @param {Function} hint: Hint selector
 * @param {Function} legend: Legend selector
 * @param {String} expectedRedirectUrl: Page URL to assert after successful form submission
 * @returns {Object} Rendering and form submission assertion functions
 */
export const assertCurrencyFormFields = ({
  completeNonCurrencyFieldsFunction,
  errorIndex,
  errors,
  fieldId,
  gbpCurrencyCheckedByDefault,
  hint,
  legend,
  expectedRedirectUrl,
}) => {
  const assertions = fieldAssertions({
    alternativeCurrencyText: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
    errors,
    gbpCurrencyCheckedByDefault,
    hint,
    legend,
  });

  return {
    rendering: () => renderingAssertions(assertions),
    formSubmission: () =>
      formSubmissionAssertions({
        ...assertions,
        completeNonCurrencyFieldsFunction,
        errorIndex,
        expectedRedirectUrl,
      }),
    prefixAssertions: () => prefixAssertions({ fieldId }),
  };
};

export default assertCurrencyFormFields;

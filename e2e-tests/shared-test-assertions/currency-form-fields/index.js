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
 * @param {number} errorIndex: Index of the currency field error.
 * @param {object} errors: Other validation errors for the same form
 * @param {string} fieldId: Field ID of input for prefix assertion
 * @param {boolean} gbpCurrencyCheckedByDefault: GBP currency should be checked by default
 * @param {Function} hint: Hint selector
 * @param {Function} legend: Legend selector
 * @param {string} expectedRedirectUrl: Page URL to assert after successful form submission
 * @returns {object} Rendering and form submission assertion functions
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

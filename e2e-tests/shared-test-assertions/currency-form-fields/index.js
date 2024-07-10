import { FIELDS } from '../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import fieldAssertions from './assertions';

const { CURRENCY: { ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

import renderingAssertions from './rendering';
import formSubmissionAssertions from './form-submission';
import prefixAssertions from './prefix';

/**
 * assertCurrencyFormFields
 * Assert currency form fields
 * @param {Function} legend: Legend selector
 * @param {Function} hint: Hint selector
 * @param {Object} errors: Other validation errors for the same form
 * @param {String} fieldId: Field ID of input for prefix assertion
 * @param {Boolean} gbpCurrencyCheckedByDefault: GBP currency should be checked by default
 * @returns {Object} Rendering and form submission assertion functions
 */
export const assertCurrencyFormFields = ({
  legend, hint, errors, fieldId, gbpCurrencyCheckedByDefault,
}) => {
  const assertions = fieldAssertions({
    legend,
    hint,
    alternativeCurrencyText: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
    errors,
    gbpCurrencyCheckedByDefault,
  });

  return {
    rendering: () => renderingAssertions(assertions),
    formSubmission: () => formSubmissionAssertions(assertions),
    prefixAssertions: () => prefixAssertions({ fieldId }),
  };
};

export default assertCurrencyFormFields;

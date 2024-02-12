import { FIELDS } from '../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import fieldAssertions from './assertions';

const { CURRENCY: { ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

import renderingAssertions from './rendering';
import formSubmissionAssertions from './form-submission';

/**
 * assertCurrencyFormFields
 * Assert currency form fields
 * @param {Function} legend: Legend selector
 * @param {Function} hint: Hint selector
 * @param {Object} errors: Error messages object
 * @returns {Object} Rendering and form submission assertion functions
 */
export const assertCurrencyFormFields = ({ legend, hint, errors }) => {
  const assertions = fieldAssertions({
    legend,
    hint,
    alternativeCurrencyText: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
    errors,
  });

  return {
    rendering: () => renderingAssertions(assertions),
    formSubmission: () => formSubmissionAssertions(assertions),
  };
};

export default assertCurrencyFormFields;

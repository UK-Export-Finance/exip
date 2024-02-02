import { FIELDS } from '../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import fieldAssertions from '../../commands/insurance/assert-currency-form-fields';

const { CURRENCY: { ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

import renderingAssertions from './rendering';
import formSubmissionAssertions from './form-submission';

export const assertCurrencyFormFields = ({ legend, errors }) => {
  const assertions = fieldAssertions({
    legend,
    alternativeCurrencyText: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
    errors,
  });

  return {
    rendering: () => renderingAssertions(assertions),
    formSubmission: () => formSubmissionAssertions(assertions),
  };
};

export default assertCurrencyFormFields;

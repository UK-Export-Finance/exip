import { POLICY_FIELDS } from '../../content-strings/fields/insurance/policy';
import { FIELDS } from '../../content-strings';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy';
import assertCurrencyFormFields from './assert-currency-form-fields';

const { POLICY_CURRENCY_CODE, ALTERNATIVE_POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

/**
 * checkPolicyCurrencyCodeInput
 * Check "policy currency code" legend and radio options
 */
const checkPolicyCurrencyCodeInput = () => {
  const fieldId = POLICY_CURRENCY_CODE;

  const CONTENT_STRINGS = POLICY_FIELDS.CONTRACT_POLICY[fieldId];

  const {
    legend, hint, radios,
  } = assertCurrencyFormFields({
    fieldId,
    legend: CONTENT_STRINGS.LEGEND,
    hint: CONTENT_STRINGS.HINT,
    alternativeCurrencyText: FIELDS[ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT,
  });

  legend();
  hint();
  radios();
};

export default checkPolicyCurrencyCodeInput;

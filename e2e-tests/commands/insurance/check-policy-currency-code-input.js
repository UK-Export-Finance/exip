import { POLICY_FIELDS } from '../../content-strings/fields/insurance/policy';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy';
import assertAlternativeCurrencyForm from './assert-alternative-currency-form';

const { POLICY_CURRENCY_CODE, ALTERNATIVE_POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const { CONTRACT_POLICY } = POLICY_FIELDS;

/**
 * checkPolicyCurrencyCodeInput
 * Check "policy currency code" legend and radio options
 */
const checkPolicyCurrencyCodeInput = () => {
  const fieldId = POLICY_CURRENCY_CODE;

  const CONTENT_STRINGS = POLICY_FIELDS.CONTRACT_POLICY[fieldId];

  const {
    legend, hint, radios, alternativeCurrencyInput,
  } = assertAlternativeCurrencyForm({
    FIELD_ID: fieldId,
    LEGEND: CONTENT_STRINGS.LEGEND,
    HINT: CONTENT_STRINGS.HINT,
    ALTERNATIVE_CURRENCY_CODE: ALTERNATIVE_POLICY_CURRENCY_CODE,
    ALTERNATIVE_CURRENCY_TEXT: CONTRACT_POLICY[fieldId][ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT,
  });

  legend();
  hint();
  radios();
  alternativeCurrencyInput();
};

export default checkPolicyCurrencyCodeInput;

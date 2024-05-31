import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import mapDateFields from './date-fields';
import hasPolicyTypeChanged from '../../../../../helpers/has-policy-type-changed';
import nullifyGenericContractPolicyFields from '../../../../../helpers/nullify-generic-contract-policy-fields';
import nullifyMultipleContractPolicyFields from '../../../../../helpers/nullify-multiple-contract-policy-fields';
import nullifySingleContractPolicyFields from '../../../../../helpers/nullify-single-contract-policy-fields';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../../../helpers/policy-type';
import mapCurrencyCodeFormData from '../../../../../helpers/mappings/map-currency-code-form-data';
import { objectHasProperty } from '../../../../../helpers/object';
import { Application, RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    POLICY_TYPE,
    CONTRACT_POLICY: { POLICY_CURRENCY_CODE },
    NEED_PRE_CREDIT_PERIOD,
    CREDIT_PERIOD_WITH_BUYER,
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapSubmittedData
 * Check form data and map any fields that need to be sent to the API in a different format or structure.
 * 1) Map date fields into timestamps.
 * 2) If NEED_PRE_CREDIT_PERIOD is provided as "no", wipe the CREDIT_PERIOD_WITH_BUYER field.
 * 3) If the policy type has changed, nullify generic contract policy fields.
 * 4) If a policy is a "single" policy, nullify "multiple" policy fields.
 * 5) If a policy is a "multiple" policy, nullify "single" policy fields.
 * 6) Map submitted currency fields.
 * @param {RequestBody} formBody: Form data
 * @returns {Object} Mapped data
 */
const mapSubmittedData = (formBody: RequestBody, application: Application): object => {
  const { _csrf, ...otherFields } = formBody;

  let populatedData = otherFields;

  populatedData = mapDateFields(formBody);

  /**
   * If NEED_PRE_CREDIT_PERIOD is answered as "no",
   * wipe the CREDIT_PERIOD_WITH_BUYER field.
   */
  if (formBody[NEED_PRE_CREDIT_PERIOD] === 'false') {
    populatedData[CREDIT_PERIOD_WITH_BUYER] = '';
  }

  const policyType = formBody[POLICY_TYPE];

  const policyTypeHasChanged = hasPolicyTypeChanged(policyType, application.policy.policyType);

  if (policyTypeHasChanged) {
    populatedData = nullifyGenericContractPolicyFields(populatedData);
  }

  /**
   * If the policy type is "single",
   * wipe "multiple" specific fields.
   */
  if (isSinglePolicyType(policyType)) {
    populatedData = nullifyMultipleContractPolicyFields(populatedData);
  }

  /**
   * If the policy type is "multiple",
   * wipe "single" specific fields.
   */
  if (isMultiplePolicyType(policyType)) {
    populatedData = nullifySingleContractPolicyFields(populatedData);
  }

  populatedData = mapCurrencyCodeFormData(populatedData);

  /**
   * if a CURRENCY_CODE field is provided,
   * map this into a POLICY_CURRENCY_CODE field.
   */
  if (objectHasProperty(populatedData, CURRENCY_CODE)) {
    populatedData[POLICY_CURRENCY_CODE] = populatedData[CURRENCY_CODE];

    delete populatedData[CURRENCY_CODE];
  }

  return populatedData;
};

export default mapSubmittedData;

import { field as fieldSelector } from '../../pages/shared';
import { POLICY_FIELDS } from '../../content-strings/fields/insurance/policy';
import { SUPPORTED_CURRENCIES } from '../../constants';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy';

const { POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

/**
 * checkPolicyCurrencyCodeInput
 * Check "policy currency code" label, hint and input.
 */
const checkPolicyCurrencyCodeInput = () => {
  const fieldId = POLICY_CURRENCY_CODE;
  const field = fieldSelector(fieldId);

  const CONTENT_STRINGS = POLICY_FIELDS.CONTRACT_POLICY[fieldId];

  cy.checkText(
    field.label(),
    CONTENT_STRINGS.LABEL,
  );

  field.input().should('exist');

  field.inputOption().should('have.length', SUPPORTED_CURRENCIES.length + 1);

  field.inputFirstOption().should('be.disabled');
  field.input().select(1).should('have.value', SUPPORTED_CURRENCIES[0]);
  field.input().select(2).should('have.value', SUPPORTED_CURRENCIES[1]);
  field.input().select(3).should('have.value', SUPPORTED_CURRENCIES[2]);
};

export default checkPolicyCurrencyCodeInput;

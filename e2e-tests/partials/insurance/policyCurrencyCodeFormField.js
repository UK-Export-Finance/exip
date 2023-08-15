import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy-and-exports';

const { POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const policyCurrencyCodeFormField = {
  label: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-label"]`),
  hint: {
    text: {
      usuallyIssues: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-hint-usually-issues"]`),
      differentCurrency: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-hint-different-currency"]`),
    },
    link: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-hint-link"]`),
  },
  input: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`),
  inputOption: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find('option'),
  inputFirstOption: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find('option').eq(0),
  inputOptionSelected: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find(':selected'),
  errorMessage: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-error-message"]`),
};

export default policyCurrencyCodeFormField;

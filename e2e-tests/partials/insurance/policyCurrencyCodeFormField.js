import { field } from '../../pages/shared';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy-and-exports';

const { POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const policyCurrencyCodeFormField = {
  ...field(POLICY_CURRENCY_CODE),
  hint: {
    text: {
      usuallyIssues: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-hint-usually-issues"]`),
      differentCurrency: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-hint-different-currency"]`),
    },
    link: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-hint-link"]`),
  },
};

export default policyCurrencyCodeFormField;

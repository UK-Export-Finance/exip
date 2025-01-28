import { field } from '../../shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const multipleContractPolicyExportValue = {
  [MAXIMUM_BUYER_WILL_OWE]: {
    ...field(MAXIMUM_BUYER_WILL_OWE),
    hint: {
      forExample: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-for-example"]`),
      initialCreditLimit: {
        intro: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-initial-credit-limit-intro"]`),
        link: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-initial-credit-limit-link"]`),
      },
      noDecimals: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-no-decimals"]`),
    },
    text: () => cy.get('[data-cy="details-1"]'),
    link: () => cy.get('[data-cy="details-1"] a'),
  },
};

export default multipleContractPolicyExportValue;

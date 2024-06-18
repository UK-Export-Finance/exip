import { field } from '../../shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY: {
    EXPORT_VALUE: {
      MULTIPLE: {
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const multipleContractPolicyExportValue = {
  [MAXIMUM_BUYER_WILL_OWE]: {
    ...field(MAXIMUM_BUYER_WILL_OWE),
    hint: {
      forExample: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-for-example"]`),
      needMoreCover: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-need-more-cover"]`),
      fillInFormLink: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-fill-in-form-link"]`),
      noDecimals: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-no-decimals"]`),
    },
    text: () => cy.get('[data-cy="details-1"]'),
    link: () => cy.get('[data-cy="details-1"] a'),
  },
};

export default multipleContractPolicyExportValue;

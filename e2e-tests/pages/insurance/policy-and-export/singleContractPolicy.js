import { field } from '../../shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      SINGLE: {
        TOTAL_CONTRACT_VALUE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const singleContractPolicy = {
  [TOTAL_CONTRACT_VALUE]: {
    ...field(TOTAL_CONTRACT_VALUE),
    hint: {
      needMoreCover: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint-need-more-cover"]`),
      link: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint-link"]`),
      noDecimals: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint-no-decimals"]`),
    },
  },
};

export default singleContractPolicy;

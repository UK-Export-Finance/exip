import { FIELD_IDS } from '../../../constants';

const {
  INSURANCE: {
    DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
  },
} = FIELD_IDS;

const codeOfConductPage = {
  hint: {
    intro: () => cy.get(`[data-cy="${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT}-hint-intro"]`),
    link: () => cy.get(`[data-cy="${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT}-hint-link"]`),
  },
  revealText: () => cy.get(`[data-cy="${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT}-reveal-text"]`),
};

export default codeOfConductPage;

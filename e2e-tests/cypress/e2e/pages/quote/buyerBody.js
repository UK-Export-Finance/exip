import { FIELD_IDS } from '../../../../constants';

const buyerBodyPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.VALID_BUYER_BODY]: {
    yes: () => cy.get(`[data-cy="${FIELD_IDS.VALID_BUYER_BODY}-yes"]`),
    no: () => cy.get(`[data-cy="${FIELD_IDS.VALID_BUYER_BODY}-no"]`),
    yesInput: () => cy.get(`[data-cy="${FIELD_IDS.VALID_BUYER_BODY}-yes-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.VALID_BUYER_BODY}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default buyerBodyPage;

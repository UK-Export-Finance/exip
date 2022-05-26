import CONSTANTS from '../../../constants';

const buyerBasedPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [CONSTANTS.FIELDS.VALID_BUYER_BASE]: {
    yes: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.VALID_BUYER_BASE}-yes"]`),
    no: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.VALID_BUYER_BASE}-no"]`),
    errorMessage: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.VALID_BUYER_BASE}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default buyerBasedPage;

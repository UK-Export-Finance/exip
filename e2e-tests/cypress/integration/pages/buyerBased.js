import CONSTANTS from '../../../constants';

const buyerBasedPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [CONSTANTS.FIELD_IDSVALID_BUYER_BASE]: {
    yes: () => cy.get(`[data-cy="${CONSTANTS.FIELD_IDSVALID_BUYER_BASE}-yes"]`),
    yesInput: () => cy.get(`[data-cy="${CONSTANTS.FIELD_IDSVALID_BUYER_BASE}-yes-input"]`),
    no: () => cy.get(`[data-cy="${CONSTANTS.FIELD_IDSVALID_BUYER_BASE}-no"]`),
    errorMessage: () => cy.get(`[data-cy="${CONSTANTS.FIELD_IDSVALID_BUYER_BASE}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default buyerBasedPage;

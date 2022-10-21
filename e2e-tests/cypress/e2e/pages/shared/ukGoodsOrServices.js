import { FIELD_IDS } from '../../../../constants';

const ukGoodsOrServicesPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  yes: () => cy.get(`[data-cy="${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES}-yes"]`),
  yesInput: () => cy.get(`[data-cy="${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES}-yes-input"]`),
  no: () => cy.get(`[data-cy="${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES}-no"]`),
  noInput: () => cy.get(`[data-cy="${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES}-no-input"]`),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default ukGoodsOrServicesPage;

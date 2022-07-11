import { FIELD_IDS } from '../../../constants';

const canGetPrivateInsurancePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: {
    yes: () => cy.get(`[data-cy="${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE}-yes"]`),
    yesInput: () => cy.get(`[data-cy="${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE}-yes-input"]`),
    no: () => cy.get(`[data-cy="${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE}-no"]`),
    noInput: () => cy.get(`[data-cy="${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE}-no-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.CAN_GET_PRIVATE_INSURANCE}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default canGetPrivateInsurancePage;

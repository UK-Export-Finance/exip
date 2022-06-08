import { FIELD_IDS } from '../../../constants';

const companyBasedPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.VALID_COMPANY_BASE]: {
    yes: () => cy.get(`[data-cy="${FIELD_IDS.VALID_COMPANY_BASE}-yes"]`),
    no: () => cy.get(`[data-cy="${FIELD_IDS.VALID_COMPANY_BASE}-no"]`),
    yesInput: () => cy.get(`[data-cy="${FIELD_IDS.VALID_COMPANY_BASE}-yes-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.VALID_COMPANY_BASE}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default companyBasedPage;

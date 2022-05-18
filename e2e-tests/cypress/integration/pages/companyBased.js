import CONSTANTS from '../../../constants';

const companyBasedPage = {
  visit: () => cy.visit('/company-based'),
  heading: () => cy.get('[data-cy="heading"]'),
  [CONSTANTS.FIELDS.VALID_COMPANY_BASE]: {
    yes: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.VALID_COMPANY_BASE}-yes"]`),
    no: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.VALID_COMPANY_BASE}-no"]`),
    errorMessage: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.VALID_COMPANY_BASE}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default companyBasedPage;

import CONSTANTS from '../../../constants';

const ukContentPercentagePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  description1: () => cy.get('[data-cy="description-1"]'),
  description2: () => cy.get('[data-cy="description-2"]'),
  warning: () => cy.get('[data-cy="warning"]'),
  label: () => cy.get('[data-cy="label"]'),
  hint: () => cy.get('[data-cy="label-hint"]'),
  input: () => cy.get('[data-cy="input"]'),
  errorMessage: () => cy.get(`[data-cy="${CONSTANTS.FIELDS.UK_CONTENT_PERCENTAGE}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default ukContentPercentagePage;

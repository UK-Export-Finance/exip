import { FIELD_IDS } from '../../../constants';

const ukContentPercentagePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  yes: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-yes"]`),
  yesInput: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-yes-input"]`),
  no: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-no"]`),
  noInput: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-no-input"]`),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
  details: {
    summary: () => cy.get('[data-cy="details"] summary'),
    item1: () => cy.get('[data-cy="details-1"]'),
    item2: () => cy.get('[data-cy="details-2"]'),
    item2Link: () => cy.get('[data-cy="details-2"] a'),
    item3: () => cy.get('[data-cy="details-3"]'),
  },
};

export default ukContentPercentagePage;

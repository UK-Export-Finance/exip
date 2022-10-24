import { FIELD_IDS } from '../../../../../constants';

const insuredAmountPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  yes: () => cy.get(`[data-cy="${FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD}-yes"]`),
  yesInput: () => cy.get(`[data-cy="${FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD}-yes-input"]`),
  no: () => cy.get(`[data-cy="${FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD}-no"]`),
  noInput: () => cy.get(`[data-cy="${FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD}-no-input"]`),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default insuredAmountPage;

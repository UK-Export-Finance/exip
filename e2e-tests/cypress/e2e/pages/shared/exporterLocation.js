import { FIELD_IDS } from '../../../../constants';

const exporterLocationPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.VALID_EXPORTER_LOCATION]: {
    yes: () => cy.get(`[data-cy="${FIELD_IDS.VALID_EXPORTER_LOCATION}-yes"]`),
    no: () => cy.get(`[data-cy="${FIELD_IDS.VALID_EXPORTER_LOCATION}-no"]`),
    yesInput: () => cy.get(`[data-cy="${FIELD_IDS.VALID_EXPORTER_LOCATION}-yes-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.VALID_EXPORTER_LOCATION}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default exporterLocationPage;

import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  CONTACT: {
    COMPANY_NAME,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const yourContactPage = {
  [COMPANY_NAME]: {
    label: () => cy.get(`[data-cy="${COMPANY_NAME}-label"]`),
    hint: () => cy.get(`[data-cy="${COMPANY_NAME}-hint"]`),
    details: () => cy.get(`[data-cy="${COMPANY_NAME}"]`),
  },
  contactDetailsHeading: () => cy.get('[data-cy="contact-details-heading"]'),
  contactDetailsHint: () => cy.get('[data-cy="contact-details-hint"]'),
  field: (field) => ({
    label: () => cy.get(`[data-cy="${field}-label"]`),
    input: () => cy.get(`[data-cy="${field}"]`),
    errorMessage: () => cy.get(`[data-cy="${field}-error"]`),
  }),
};

export default yourContactPage;

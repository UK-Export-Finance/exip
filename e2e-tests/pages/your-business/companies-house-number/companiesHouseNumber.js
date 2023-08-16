import { FIELD_IDS } from '../../../constants/field-ids';

const {
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const companiesHouseNumber = {
  heading: () => cy.get('[data-cy="heading"]'),

  hint: () => cy.get(`[data-cy="${COMPANIES_HOUSE_NUMBER}-hint"]`),
  input: () => cy.get(`[data-cy="${COMPANIES_HOUSE_NUMBER}"]`),
  errorMessage: () => cy.get(`[data-cy="${COMPANIES_HOUSE_NUMBER}-error"]`),

  doNotHaveACompaniesHouseNumber: () => cy.get('[data-cy="do-not-have-number"]'),

};

export default companiesHouseNumber;

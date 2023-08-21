import { FIELD_IDS } from '../../../constants/field-ids';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_INTERNATIONAL,
    EMPLOYEES_UK,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const natureOfBusiness = {
  [GOODS_OR_SERVICES]: {
    input: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}`),
    label: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-label`),
    hint: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-hint`),
    errorMessage: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-error`),
  },
  [YEARS_EXPORTING]: {
    input: () => cy.get(`[data-cy="${YEARS_EXPORTING}`),
    label: () => cy.get(`[data-cy="${YEARS_EXPORTING}-label`),
    hint: () => cy.get(`[data-cy="${YEARS_EXPORTING}-hint`),
    suffix: () => cy.get(`[data-cy="${YEARS_EXPORTING}-suffix`),
    errorMessage: () => cy.get(`[data-cy="${YEARS_EXPORTING}-error`),
  },
  [EMPLOYEES_UK]: {
    input: () => cy.get(`[data-cy="${EMPLOYEES_UK}`),
    legend: () => cy.get(`[data-cy="${EMPLOYEES_UK}-legend`),
    label: () => cy.get(`[data-cy="${EMPLOYEES_UK}-label`),
    errorMessage: () => cy.get(`[data-cy="${EMPLOYEES_UK}-error`),
  },
  [EMPLOYEES_INTERNATIONAL]: {
    input: () => cy.get(`[data-cy="${EMPLOYEES_INTERNATIONAL}`),
    label: () => cy.get(`[data-cy="${EMPLOYEES_INTERNATIONAL}-label`),
    errorMessage: () => cy.get(`[data-cy="${EMPLOYEES_INTERNATIONAL}-error`),
  },
};

export default natureOfBusiness;

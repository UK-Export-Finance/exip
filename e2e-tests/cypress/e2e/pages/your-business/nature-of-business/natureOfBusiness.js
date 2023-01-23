import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const natureOfBusiness = {
  [GOODS_OR_SERVICES]: {
    input: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}`),
    label: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-label`),
    hint: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-hint`),
    error: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-error`),
  },
  [YEARS_EXPORTING]: {
    input: () => cy.get(`[data-cy="${YEARS_EXPORTING}`),
    label: () => cy.get(`[data-cy="${YEARS_EXPORTING}-label`),
    hint: () => cy.get(`[data-cy="${YEARS_EXPORTING}-hint`),
    suffix: () => cy.get(`[data-cy="${YEARS_EXPORTING}-suffix`),
    error: () => cy.get(`[data-cy="${YEARS_EXPORTING}-error`),
  },
};

export default natureOfBusiness;

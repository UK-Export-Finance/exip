import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
    ESTIMATED_ANNUAL_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const turnover = {
  [FINANCIAL_YEAR_END_DATE]: {
    value: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}`),
    label: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-label`),
    hint: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-hint`),
  },
  [ESTIMATED_ANNUAL_TURNOVER]: {
    heading: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-heading`),
    label: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-label`),
    prefix: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-prefix`),
    input: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}`),
    error: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-error`),
  },
};

export default turnover;

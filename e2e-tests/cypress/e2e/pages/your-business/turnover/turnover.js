import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const turnover = {
  [FINANCIAL_YEAR_END_DATE]: {
    value: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}`),
    label: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-label`),
    hint: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-hint`),
  },
  [ESTIMATED_ANNUAL_TURNOVER]: {
    legend: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-legend`),
    label: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-label`),
    prefix: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-prefix`),
    input: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}`),
    errorMessage: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-error`),
  },
  [PERCENTAGE_TURNOVER]: {
    label: () => cy.get(`[data-cy="${PERCENTAGE_TURNOVER}-label`),
    suffix: () => cy.get(`[data-cy="${PERCENTAGE_TURNOVER}-suffix`),
    input: () => cy.get(`[data-cy="${PERCENTAGE_TURNOVER}`),
    errorMessage: () => cy.get(`[data-cy="${PERCENTAGE_TURNOVER}-error`),
  },
};

export default turnover;

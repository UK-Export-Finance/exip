import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const turnover = {
  [FINANCIAL_YEAR_END_DATE]: {
    value: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}`),
    label: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-label`),
    hint: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-hint`),
  },
};

export default turnover;

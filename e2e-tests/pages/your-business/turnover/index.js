import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: {
    TURNOVER: { FINANCIAL_YEAR_END_DATE },
  },
} = INSURANCE_FIELD_IDS;

const turnover = {
  [FINANCIAL_YEAR_END_DATE]: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}`),
};

export default turnover;

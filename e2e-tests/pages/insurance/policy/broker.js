import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY: {
    BROKER: { DETAILS },
  },
} = INSURANCE_FIELD_IDS;

const brokerPage = {
  [DETAILS]: {
    details: () => cy.get(`[data-cy="${DETAILS}`),
    summary: () => cy.get(`[data-cy="${DETAILS}"] summary`),
    line1: () => cy.get(`[data-cy="${DETAILS}-line-1"]`),
    line2: () => cy.get(`[data-cy="${DETAILS}-line-2`),
    line3: () => cy.get(`[data-cy="${DETAILS}-line-3`),
    line4: () => cy.get(`[data-cy="${DETAILS}-line-4`),
    link: () => cy.get(`[data-cy="${DETAILS}-link`),
  },
};

export default brokerPage;

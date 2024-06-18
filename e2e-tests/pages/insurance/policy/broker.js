import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';

const {
  USING_BROKER,
} = POLICY_FIELD_IDS;

const brokerPage = {
  summary: () => cy.get(`[data-cy="${USING_BROKER}-details"] summary`),
  details: () => cy.get(`[data-cy="${USING_BROKER}-details`),
  line1: () => cy.get(`[data-cy="${USING_BROKER}-details-line-1"]`),
  line2: () => cy.get(`[data-cy="${USING_BROKER}-details-line-2`),
  line3: () => cy.get(`[data-cy="${USING_BROKER}-details-line-3`),
  line4: () => cy.get(`[data-cy="${USING_BROKER}-details-line-4`),
  link: () => cy.get(`[data-cy="${USING_BROKER}-details-link`),
};

export default brokerPage;

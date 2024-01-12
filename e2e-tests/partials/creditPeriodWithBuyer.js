import { POLICY as POLICY_FIELD_IDS } from '../constants/field-ids/insurance/policy';

const { NEED_PRE_CREDIT_PERIOD } = POLICY_FIELD_IDS;

const creditPeriodWithBuyer = {
  summary: () => cy.get(`[data-cy="${NEED_PRE_CREDIT_PERIOD}-description"] summary`),
  details: () => cy.get(`[data-cy="${NEED_PRE_CREDIT_PERIOD}-description"]`),
  protectsYou: () => cy.get(`[data-cy="${NEED_PRE_CREDIT_PERIOD}-description-protects-you"]`),
  insuresYou: () => cy.get(`[data-cy="${NEED_PRE_CREDIT_PERIOD}-description-insures-you"]`),
  happensBefore: () => cy.get(`[data-cy="${NEED_PRE_CREDIT_PERIOD}-description-happens-before"]`),
};

export default creditPeriodWithBuyer;

import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const { IS_MEMBER_OF_A_GROUP } = INSURANCE_FIELD_IDS.ELIGIBILITY;

export const memberOfAGroup = {
  summary: () => cy.get(`[data-cy="${IS_MEMBER_OF_A_GROUP}-description"] summary`),
  details: () => cy.get(`[data-cy="${IS_MEMBER_OF_A_GROUP}-description"]`),
  description: () => cy.get(`[data-cy="${IS_MEMBER_OF_A_GROUP}-description-details"]`),
};

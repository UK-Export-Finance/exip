import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const { MEMBER_OF_A_GROUP } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const memberOfAGroupPartial = {
  summary: () => cy.get(`[data-cy="${MEMBER_OF_A_GROUP}-description"] summary`),
  details: () => cy.get(`[data-cy="${MEMBER_OF_A_GROUP}-description"]`),
  description: () => cy.get(`[data-cy="${MEMBER_OF_A_GROUP}-description-details"]`),
};

export default memberOfAGroupPartial;

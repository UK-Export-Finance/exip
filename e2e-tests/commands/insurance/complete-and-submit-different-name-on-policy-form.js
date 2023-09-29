import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { submitButton, input } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY_AND_EXPORTS: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const { POLICY_CONTACT } = application;

/**
 * completeAndSubmitDifferentNameOnPolicyForm
 * Runs through the different name on policy form in the "policy" section
 */
const completeAndSubmitDifferentNameOnPolicyForm = () => {
  cy.keyboardInput(input.field(FIRST_NAME).input(), POLICY_CONTACT[FIRST_NAME]);
  cy.keyboardInput(input.field(LAST_NAME).input(), POLICY_CONTACT[LAST_NAME]);

  cy.keyboardInput(input.field(EMAIL).input(), POLICY_CONTACT[EMAIL]);

  cy.keyboardInput(input.field(POSITION).input(), POLICY_CONTACT[POSITION]);

  submitButton().click();
};

export default completeAndSubmitDifferentNameOnPolicyForm;

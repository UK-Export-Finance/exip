import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { submitButton, input } from '../../pages/shared';
import application from '../../fixtures/application';

// TODO: remove once shifted to policy
const {
  EXPORTER_BUSINESS: {
    CONTACT: {
      BUSINESS_CONTACT_DETAIL,
    },
  },
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

// TODO: remove once shifted to policy
const businessContactDetails = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL];

/**
 * completeAndSubmitDifferentNameOnPolicyForm
 * Runs through the different name on policy form in the "policy" section
 */
const completeAndSubmitDifferentNameOnPolicyForm = () => {
  cy.keyboardInput(input.field(FIRST_NAME).input(), businessContactDetails[FIRST_NAME]);
  cy.keyboardInput(input.field(LAST_NAME).input(), businessContactDetails[LAST_NAME]);

  cy.keyboardInput(input.field(EMAIL).input(), businessContactDetails[EMAIL]);

  cy.keyboardInput(input.field(POSITION).input(), businessContactDetails[POSITION]);

  submitButton().click();
};

export default completeAndSubmitDifferentNameOnPolicyForm;

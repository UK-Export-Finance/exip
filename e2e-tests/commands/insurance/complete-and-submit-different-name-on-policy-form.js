import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { submitButton, input } from '../../pages/shared';
import mockApplication from '../../fixtures/application';

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

const { POLICY_CONTACT } = mockApplication;

/**
 * completeAndSubmitDifferentNameOnPolicyForm
 * Runs through the different name on policy form in the "policy" section
 * @param {String} First name
 * @param {String} Last name
 * @param {Boolean} submit - should form by submitted - default true
 */
const completeAndSubmitDifferentNameOnPolicyForm = ({
  firstName = POLICY_CONTACT[FIRST_NAME],
  lastName = POLICY_CONTACT[LAST_NAME],
  submit = true,
}) => {
  cy.keyboardInput(input.field(FIRST_NAME).input(), firstName);
  cy.keyboardInput(input.field(LAST_NAME).input(), lastName);

  cy.keyboardInput(input.field(EMAIL).input(), POLICY_CONTACT[EMAIL]);

  cy.keyboardInput(input.field(POSITION).input(), POLICY_CONTACT[POSITION]);

  if (submit) {
    submitButton().click();
  }
};

export default completeAndSubmitDifferentNameOnPolicyForm;

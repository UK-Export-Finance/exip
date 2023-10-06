import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
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
 * completeDifferentNameOnPolicyForm
 * Runs through the different name on policy form in the "policy" section
 * @param {String} First name
 * @param {String} Last name
 */
const completeDifferentNameOnPolicyForm = ({
  firstName = POLICY_CONTACT[FIRST_NAME],
  lastName = POLICY_CONTACT[LAST_NAME],
}) => {
  cy.keyboardInput(field(FIRST_NAME).input(), firstName);
  cy.keyboardInput(field(LAST_NAME).input(), lastName);

  cy.keyboardInput(field(EMAIL).input(), POLICY_CONTACT[EMAIL]);

  cy.keyboardInput(field(POSITION).input(), POLICY_CONTACT[POSITION]);
};

export default completeDifferentNameOnPolicyForm;

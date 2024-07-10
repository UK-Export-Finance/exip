import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import mockApplication from '../../fixtures/application';

const {
  POLICY: {
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
 * Complete the "different name on policy form"
 * @param {String} firstName: First name
 * @param {String} lastName: Last name
 * @param {String} email: Email
 * @param {String} position: Position
 */
const completeDifferentNameOnPolicyForm = ({
  firstName = POLICY_CONTACT[FIRST_NAME],
  lastName = POLICY_CONTACT[LAST_NAME],
  email = POLICY_CONTACT[EMAIL],
  position = POLICY_CONTACT[POSITION],
}) => {
  if (firstName) {
    cy.keyboardInput(field(FIRST_NAME).input(), firstName);
  }

  if (lastName) {
    cy.keyboardInput(field(LAST_NAME).input(), lastName);
  }

  if (email) {
    cy.keyboardInput(field(EMAIL).input(), email);
  }

  if (position) {
    cy.keyboardInput(field(POSITION).input(), position);
  }
};

export default completeDifferentNameOnPolicyForm;

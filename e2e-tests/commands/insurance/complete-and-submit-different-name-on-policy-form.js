import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { submitButton } from '../../pages/shared';
import mockApplication from '../../fixtures/application';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
  },
} = INSURANCE_FIELD_IDS;

const { POLICY_CONTACT } = mockApplication;

/**
 * completeAndSubmitDifferentNameOnPolicyForm
 * Runs through the different name on policy form in the "policy" section
 * @param {String} First name
 * @param {String} Last name
 */
const completeAndSubmitDifferentNameOnPolicyForm = ({
  firstName = POLICY_CONTACT[FIRST_NAME],
  lastName = POLICY_CONTACT[LAST_NAME],
}) => {
  cy.completeDifferentNameOnPolicyForm({ firstName, lastName });
  submitButton().click();
};

export default completeAndSubmitDifferentNameOnPolicyForm;

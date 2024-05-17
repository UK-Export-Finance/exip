/**
 * completeAndSubmitDifferentNameOnPolicyForm
 * Complete and submit the "different name on policy form"
 * @param {String} firstName: First name
 * @param {String} lastName: Last name
 * @param {String} email: Email
 * @param {String} position: Position
 */
const completeAndSubmitDifferentNameOnPolicyForm = ({
  firstName,
  lastName,
  email,
  position,
}) => {
  cy.completeDifferentNameOnPolicyForm({
    firstName,
    lastName,
    email,
    position,
  });
  cy.clickSubmitButton();
};

export default completeAndSubmitDifferentNameOnPolicyForm;

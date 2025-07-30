/**
 * completeAndSubmitDifferentNameOnPolicyForm
 * Complete and submit the "different name on policy form"
 * @param {string} firstName: First name
 * @param {string} lastName: Last name
 * @param {string} email: Email
 * @param {string} position: Position
 */
const completeAndSubmitDifferentNameOnPolicyForm = ({ firstName, lastName, email, position }) => {
  cy.completeDifferentNameOnPolicyForm({
    firstName,
    lastName,
    email,
    position,
  });
  cy.clickSubmitButton();
};

export default completeAndSubmitDifferentNameOnPolicyForm;

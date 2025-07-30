/**
 * assertDifferentNameOnPolicyFieldValues
 * Assert all field values in the "different name on policy" form.
 * @param {string} expectedFirstName: First name
 * @param {string} expectedLastName: Last name
 * @param {string} expectedEmail: Email
 * @param {string} expectedPosition: Position
 */
const assertDifferentNameOnPolicyFieldValues = ({ expectedFirstName = '', expectedLastName = '', expectedEmail = '', expectedPosition = '' }) =>
  cy.assertNameEmailAndPositionFields({
    expectedFirstName,
    expectedLastName,
    expectedEmail,
    expectedPosition,
  });

export default assertDifferentNameOnPolicyFieldValues;

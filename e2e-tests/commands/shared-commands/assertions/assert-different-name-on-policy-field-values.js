/**
 * assertDifferentNameOnPolicyFieldValues
 * Assert all field values in the "different name on policy" form.
 * @param {String} expectedFirstName: First name
 * @param {String} expectedLastName: Last name
 * @param {String} expectedEmail: Email
 * @param {String} expectedPosition: Position
 */
const assertDifferentNameOnPolicyFieldValues = ({
  expectedFirstName = '', expectedLastName = '', expectedEmail = '', expectedPosition = '',
}) =>
  cy.assertNameEmailAndPositionFields({
    expectedFirstName,
    expectedLastName,
    expectedEmail,
    expectedPosition,
  });

export default assertDifferentNameOnPolicyFieldValues;

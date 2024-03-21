/**
 * assertDynamicCharacterCount
 * Assert a dynamic character count.
 * Note: this functionality comes from a GOV component. Therefore, this test can be simple.
 * Therefore, we can simply check that the character count is present and changes after entering a character.
 * @param {String} field: Field selector
 * @param {Integer} maximum: Maximum characters allowed
 */

// TODO: content strings
// TODO: can we use check-text or something better here?
// TODO:
// TODO:
const assertDynamicCharacterCount = ({ field, maximum }) => {
  // let expectedMaximum = maximum;

  // if (maximum > 999) {
  //   expectedMaximum = maximum.toLocaleString();
  // }
  const expectedMaximum = maximum.toLocaleString();

  field.characterCount('text').should('have.text', `You have ${expectedMaximum} characters remaining`);

  cy.keyboardInput(
    field.textarea(),
    'a',
  );

  // const expectedMaximumAfterEdit = Number(expectedMaximum) - 1;
  const minusOne = maximum - 1;

  const expectedMaximumAfterEdit = minusOne.toLocaleString();

  field.characterCount('text').should('have.text', `You have ${expectedMaximumAfterEdit} characters remaining`);
};

export default assertDynamicCharacterCount;

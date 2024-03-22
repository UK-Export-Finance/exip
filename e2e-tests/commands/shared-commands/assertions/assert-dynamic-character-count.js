import { CHARACTER_COUNT } from '../../../content-strings';

/**
 * assertDynamicCharacterCount
 * Assert a dynamic character count.
 * Note: this functionality comes from a GOV component. Therefore, this test can be simple.
 * Therefore, we can simply check that the character count is present and changes after entering a character.
 * @param {String} field: Field selector
 * @param {Integer} maximum: Maximum characters allowed
 */
const assertDynamicCharacterCount = ({ field, maximum }) => {
  const expectedMaximum = maximum.toLocaleString();

  field.characterCount('text').should('have.text', CHARACTER_COUNT(expectedMaximum));

  cy.keyboardInput(
    field.textarea(),
    'a',
  );

  const expectedMaximumAfterEdit = Number(maximum - 1).toLocaleString();

  field.characterCount('text').should('have.text', CHARACTER_COUNT(expectedMaximumAfterEdit));
};

export default assertDynamicCharacterCount;

import { field as fieldSelector } from '../../../pages/shared';

/**
 * assertTextareaRendering
 * Assert the rendering of a textarea.
 * @param {String} fieldId: Field ID
 * @param {String} expectedLabel: Expected label (optional)
 * @param {String} expectedHint: Expected label hint (optional)
 * @param {Integer} maximumCharacters: Maximum characters allowed
 */
const assertTextareaRendering = ({
  fieldId,
  expectedLabel,
  expectedHint,
  maximumCharacters,
}) => {
  const field = fieldSelector(fieldId);

  if (expectedLabel) {
    cy.checkText(field.label(), expectedLabel);
  }

  if (expectedHint) {
    cy.checkText(field.hint(), expectedHint);
  }

  field.textarea().should('exist');
  field.textarea().should('be.visible');

  cy.assertDynamicCharacterCount({
    field,
    maximum: maximumCharacters,
  });
};

export default assertTextareaRendering;

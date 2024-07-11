import { field as fieldSelector } from '../../../pages/shared';

/**
 * checkEmailFieldRendering
 * Check the rendering of an email field
 * @param {String} fieldId: Field ID
 * @param {Object} contentStrings: field content strings
 */
const checkEmailFieldRendering = ({ fieldId, contentStrings }) => {
  const field = fieldSelector(fieldId);

  cy.checkText(field.label(), contentStrings.LABEL);

  field.input().should('exist');

  cy.checkTypeAttribute(field.input(), 'email');
};

export default checkEmailFieldRendering;

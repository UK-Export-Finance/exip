import { field as fieldSelector } from '../../../pages/shared';

/**
 * checkEmailFieldRendering
 * Check the rendering of an email field
 * @param {string} fieldId: Field ID
 * @param {object} contentStrings: field content strings
 */
const checkEmailFieldRendering = ({ fieldId, contentStrings }) => {
  const field = fieldSelector(fieldId);

  cy.checkText(field.label(), contentStrings.LABEL);

  cy.checkTypeAttribute(field.input(), 'email');
};

export default checkEmailFieldRendering;

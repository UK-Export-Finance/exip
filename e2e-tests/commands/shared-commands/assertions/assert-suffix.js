import { field } from '../../../pages/shared';

/**
 * assertSuffix
 * asserts suffix value or if it does not exist
 * @param {String} fieldId: Field ID
 * @param {String} value: Suffix value
 */
const assertSuffix = ({ fieldId, value }) => {
  if (value) {
    cy.checkText(field(fieldId).suffix(), value);
  } else {
    field(fieldId).suffix().should('not.exist');
  }
};

export default assertSuffix;

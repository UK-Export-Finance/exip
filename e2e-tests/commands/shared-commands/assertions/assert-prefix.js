import { field } from '../../../pages/shared';

/**
 * assertPrefix
 * asserts prefix value or if it does not exist
 * @param {String} fieldId fieldId for prefix
 * @param {String} value prefix value
 */
const assertPrefix = ({ fieldId, value }) => {
  if (value) {
    cy.checkText(field(fieldId).prefix(), value);
  } else {
    field(fieldId).prefix().should('not.exist');
  }
};

export default assertPrefix;

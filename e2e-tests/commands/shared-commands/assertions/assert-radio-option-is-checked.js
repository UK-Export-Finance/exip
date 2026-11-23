/**
 * assertRadioOptionIsChecked
 * Assert that a radio option is checked.
 * If an index is provided, use eq() to select the radio index.
 * Otherwise, simply use the provided input.
 * @param {Function} input: Cypress selector
 * @param {number} index: Optional radio index
 */
const assertRadioOptionIsChecked = (input, index) => {
  // A query alias lets Cypress requery the input if navigation detaches the original element.
  input.as('radioOptionToCheck');

  if (index !== undefined) {
    return cy.get('@radioOptionToCheck').eq(index).should('be.checked');
  }

  return cy.get('@radioOptionToCheck').should('be.checked');
};

export default assertRadioOptionIsChecked;

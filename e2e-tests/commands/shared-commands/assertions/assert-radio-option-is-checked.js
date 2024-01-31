/**
 * assertRadioOptionIsChecked
 * Assert that a radio option is checked.
 * @param {Function} input: Cypress selector
 */
const assertRadioOptionIsChecked = (input) => {
  input.should('be.checked');
};

export default assertRadioOptionIsChecked;

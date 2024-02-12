/**
 * assertRadioOptionIsNotChecked
 * Assert that a radio option is not checked.
 * @param {Function} input: Cypress selector
 */
const assertRadioOptionIsNotChecked = (input) => {
  input.should('not.be.checked');
};

export default assertRadioOptionIsNotChecked;

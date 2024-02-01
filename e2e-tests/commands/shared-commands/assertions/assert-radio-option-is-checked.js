/**
 * assertRadioOptionIsChecked
 * Assert that a radio option is checked.
 * If an index is provided, use eq() to select the radio index.
 * Otherwise, simply use the provided input.
 * @param {Function} input: Cypress selector
 * @param {Integer} index: Optional radio index
 */
const assertRadioOptionIsChecked = (input, index) => {
  let radioSelector = input;

  if (index) {
    radioSelector = input.eq(index);
  }

  radioSelector.should('be.checked');
};

export default assertRadioOptionIsChecked;

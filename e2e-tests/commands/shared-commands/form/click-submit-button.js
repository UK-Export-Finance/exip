import { submitButton } from '../../../pages/shared';

/**
 * clickSubmitButton
 * Click the submit button.
 * @param {string} expectedText: Optional button text to wait for before clicking.
 */
const clickSubmitButton = ({ expectedText } = {}) => {
  if (expectedText) {
    submitButton().should('contain.text', expectedText);
  }

  submitButton().click();
};

export default clickSubmitButton;

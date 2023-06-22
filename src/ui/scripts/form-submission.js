const form = document.getElementById('form');
const submitButton = document.getElementById('submit-button');

/**
 * Disable the submit button.
 * This prevents a user from spamming the button.
 */
const disableButton = () => {
  submitButton.setAttribute('disabled', 'true');
  submitButton.setAttribute('aria-disabled', 'true');
  submitButton.classList.add('govuk-button--disabled');
};

/**
 * If a form exists,
 * Add a submit event listener.
 * When submitted, disable the submit button
 */
if (form) {
  form.addEventListener('submit', () => {
    disableButton();
  });
}

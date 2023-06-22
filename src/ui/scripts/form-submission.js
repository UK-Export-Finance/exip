var form = document.getElementById('form');
var submitButton = document.getElementById('submit-button');

/**
 * Disable the submit button.
 * This prevents a user from spamming the button.
 */
var disableButton = function () {
  submitButton.setAttribute('disabled', 'true');
  submitButton.setAttribute('aria-disabled', 'true');
  submitButton.classList.add('govuk-button--disabled');
};

/**
 * Enable the submit button.
 * This ensures that the button is not disabled.
 */
var enableButton = function () {
  submitButton.removeAttribute('disabled');
  submitButton.removeAttribute('aria-disabled');
  submitButton.classList.remove('govuk-button--disabled');
};

/**
 * If a form exists,
 * Add a submit event listener.
 * When submitted, disable the submit button
 */
if (form) {
  form.addEventListener('submit', function () {
    disableButton();
  });
}

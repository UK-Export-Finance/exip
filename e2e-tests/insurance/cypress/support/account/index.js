import './sign-in';

Cypress.Commands.add('completeAndSubmitCreateAccountForm', require('../../../../commands/insurance/account/complete-and-submit-create-account-form'));
Cypress.Commands.add('completeAndSubmitSignInAccountFormMaximumInvalidRetries', require('../../../../commands/insurance/account/complete-and-submit-sign-in-account-form-maximum-invalid-retries'));
Cypress.Commands.add('completeAndSubmitEnterCodeAccountForm', require('../../../../commands/insurance/account/complete-and-submit-enter-code-account-form'));

Cypress.Commands.add('completeAndSubmitPasswordResetForm', require('../../../../commands/insurance/account/complete-and-submit-password-reset-form'));
Cypress.Commands.add('completeAndSubmitPasswordResetFormMaximumRetries', require('../../../../commands/insurance/account/complete-and-submit-password-reset-form-maximum-retries'));
Cypress.Commands.add('completeAndSubmitNewPasswordAccountForm', require('../../../../commands/insurance/account/complete-and-submit-new-password-account-form'));

Cypress.Commands.add('getAccountByEmail', require('../../../../commands/insurance/account/get-account-by-email'));
Cypress.Commands.add('verifyAccountEmail', require('../../../../commands/insurance/account/verify-account-email'));

Cypress.Commands.add('deleteAccount', require('../../../../commands/insurance/account/delete-account'));

Cypress.Commands.add('createAnAccountAndBecomeBlocked', require('../../../../commands/insurance/account/create-an-account-and-become-blocked'));

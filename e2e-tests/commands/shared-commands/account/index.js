Cypress.Commands.add('accountAddAndGetOTP', require('../../insurance/account/add-and-get-OTP'));
Cypress.Commands.add('createAccount', require('../../insurance/account/create-account'));
Cypress.Commands.add('completeSignInAndGoToApplication', require('../../insurance/account/complete-sign-in-and-go-to-application'));
Cypress.Commands.add('completeAndSubmitSignInAccountForm', require('../../insurance/account/complete-and-submit-sign-in-account-form'));
Cypress.Commands.add('completeSignInAndOTP', require('../../insurance/account/complete-sign-in-and-otp'));
Cypress.Commands.add('login', require('../../login'));
Cypress.Commands.add('signInAndAssertAllSectionsUrl', require('../../insurance/account/sign-in-and-assert-all-sections-url'));

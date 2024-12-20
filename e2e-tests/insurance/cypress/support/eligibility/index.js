Cypress.Commands.add(
  'completeAndSubmitAllInsuranceEligibilityAnswers',
  require('../../../../commands/insurance/complete-and-submit-all-insurance-eligibility-answers'),
);

Cypress.Commands.add('submitEligibilityAndStartAccountCreation', require('../../../../commands/insurance/submit-eligibility-and-start-account-creation'));
Cypress.Commands.add('submitEligibilityAndStartAccountSignIn', require('../../../../commands/insurance/submit-eligibility-and-start-account-sign-in'));
Cypress.Commands.add('assertTotalValueInsuredRadios', require('../../../../commands/insurance/eligibility/assert-total-value-insured-radios'));
Cypress.Commands.add('assertCoverPeriodRadios', require('../../../../commands/insurance/eligibility/assert-cover-period-radios'));
Cypress.Commands.add(
  'enterCountryAndAssertExitPageUrlBuyerCountry',
  require('../../../../commands/insurance/eligibility/enter-country-and-assert-exit-page-url-buyer-country'),
);
Cypress.Commands.add('completeAndSubmitEligibilityForms', require('../../../../commands/insurance/eligibility/complete-and-submit-eligibility-forms'));

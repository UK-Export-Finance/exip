Cypress.Commands.add('submitAndAssertFieldErrors', require('./submit-and-assert-field-errors'));
Cypress.Commands.add('submitAndAssertRadioErrors', require('./submit-and-assert-radio-errors'));

Cypress.Commands.add('submitInsuranceEligibilityAnswersHappyPath', require('../../insurance/eligibility/submit-answers-happy-path'));
Cypress.Commands.add('submitQuoteAnswersHappyPathSinglePolicy', require('../../quote/submit-answers-happy-path-single-policy'));

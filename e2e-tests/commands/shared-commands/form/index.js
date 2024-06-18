Cypress.Commands.add('changeAnswerField', require('./change-answer-field'));
Cypress.Commands.add('changeAnswerSelectField', require('./change-answer-select-field'));
Cypress.Commands.add('changeAnswerRadioField', require('./change-answer-radio-field'));

Cypress.Commands.add('completeAlternativeCurrencyField', require('./complete-alternative-currency-field'));
Cypress.Commands.add('clickAlternativeCurrencyRadioAndCompleteCurrency', require('./click-alternative-currency-radio-and-complete-currency'));
Cypress.Commands.add('clickAlternativeCurrencyRadioAndSubmitCurrency', require('./click-alternative-currency-radio-and-submit-currency'));

Cypress.Commands.add('clickSubmitButton', require('./click-submit-button'));
Cypress.Commands.add('clickSubmitButtonMultipleTimes', require('./click-submit-button-multiple-times'));
Cypress.Commands.add('clickSaveAndBackButton', require('./click-save-and-back-button'));
Cypress.Commands.add('clickAllSectionsLink', require('./click-all-sections-link'));

Cypress.Commands.add('submitAndAssertFieldErrors', require('./submit-and-assert-field-errors'));
Cypress.Commands.add('assertFieldErrors', require('./assert-field-errors'));
Cypress.Commands.add('submitAndAssertRadioErrors', require('./submit-and-assert-radio-errors'));

Cypress.Commands.add('submitInsuranceEligibilityAnswersHappyPath', require('../../insurance/eligibility/submit-answers-happy-path'));
Cypress.Commands.add('submitQuoteAnswersHappyPathSinglePolicy', require('../../quote/submit-answers-happy-path-single-policy'));

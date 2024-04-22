import analytics from '../../analytics';

Cypress.Commands.add('clickLinkAndAssertUrl', require('./click-link-and-assert-url'));
Cypress.Commands.add('clickBackLink', require('./click-back-link'));
Cypress.Commands.add('clickYesRadioInput', require('./click-yes-radio-input'));
Cypress.Commands.add('clickNoRadioInput', require('./click-no-radio-input'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

Cypress.Commands.add('clickProvideAlternativeCurrencyLink', require('./click-provide-alternative-currency-link'));
Cypress.Commands.add('clickAlternativeCurrencyRadioOption', require('./click-alternative-currency-radio-option'));

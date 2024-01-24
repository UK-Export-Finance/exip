import analytics from '../../analytics';

Cypress.Commands.add('clickLinkAndAssertUrl', require('./click-link-and-assert-url'));
Cypress.Commands.add('clickBackLink', require('./click-back-link'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

Cypress.Commands.add('clickAlternativeCurrencyRadioOption', require('./click-alternative-currency-radio-option'));

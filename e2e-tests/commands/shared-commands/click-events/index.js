import analytics from '../../analytics';

Cypress.Commands.add('clickBackLink', require('./click-back-link'));
Cypress.Commands.add('clickHeaderApplicationsLink', require('./click-header-applications-link'));
Cypress.Commands.add('clickLinkAndAssertUrl', require('./click-link-and-assert-url'));
Cypress.Commands.add('clickNoRadioInput', require('./click-no-radio-input'));
Cypress.Commands.add('clickSignInButtonLink', require('./click-sign-in-button-link'));
Cypress.Commands.add('clickSignInResetPasswordLink', require('./click-sign-in-reset-password-link'));
Cypress.Commands.add('clickYesRadioInput', require('./click-yes-radio-input'));

Cypress.Commands.add('clickProvideAlternativeCurrencyLink', require('./click-provide-alternative-currency-link'));
Cypress.Commands.add('clickAlternativeCurrencyRadioOption', require('./click-alternative-currency-radio-option'));

Cypress.Commands.add('clickStartNewApplicationButton', require('./click-start-new-application-button'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

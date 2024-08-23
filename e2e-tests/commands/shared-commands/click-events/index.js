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

Cypress.Commands.add('clickFooterAccessibilityStatementLink', require('./click-footer-accessibility-statement-link'));
Cypress.Commands.add('clickFooterCookiesLink', require('./click-footer-cookies-link'));

Cypress.Commands.add('clickPhaseBannerFeedbackLink', require('./click-phase-banner-feedback-link'));

Cypress.Commands.add('clickTaskBusiness', require('./tasks/click-task-business'));
Cypress.Commands.add('clickTaskBuyer', require('./tasks/click-task-buyer'));
Cypress.Commands.add('clickTaskPolicy', require('./tasks/click-task-policy'));
Cypress.Commands.add('clickTaskExportContract', require('./tasks/click-task-export-contract'));
Cypress.Commands.add('clickTaskCheckAnswers', require('./tasks/click-task-check-answers'));
Cypress.Commands.add('clickTaskDeclarationsAndSubmit', require('./tasks/click-task-declarations-and-submit'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

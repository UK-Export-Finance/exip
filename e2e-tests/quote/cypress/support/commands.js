// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@cypress-audit/lighthouse/commands';
import 'cypress-v10-preserve-cookie';

import analytics from '../../../commands/analytics';

Cypress.Commands.add('saveSession', require('../../../commands/save-session'));

Cypress.Commands.add('login', require('../../../commands/login'));
Cypress.Commands.add('checkPhaseBanner', require('../../../commands/check-phase-banner'));
Cypress.Commands.add('navigateToUrl', require('../../../commands/navigate-to-url'));
Cypress.Commands.add('assertUrl', require('../../../commands/assert-url'));
Cypress.Commands.add('clickBackLink', require('../../../commands/click-back-link'));

Cypress.Commands.add('corePageChecks', require('../../../commands/core-page-checks'));

Cypress.Commands.add('submitQuoteAnswersHappyPathSinglePolicy', require('../../../commands/quote/submit-answers-happy-path-single-policy'));
Cypress.Commands.add('submitQuoteAnswersHappyPathMultiplePolicy', require('../../../commands/quote/submit-answers-happy-path-multiple-policy'));

Cypress.Commands.add('checkAnalyticsCookiesConsentAndAccept', analytics.checkAnalyticsCookiesConsentAndAccept);
Cypress.Commands.add('checkAnalyticsCookieDoesNotExist', analytics.checkAnalyticsCookieDoesNotExist);
Cypress.Commands.add('checkAnalyticsCookieIsFalse', analytics.checkAnalyticsCookieIsFalse);
Cypress.Commands.add('checkAnalyticsCookieIsTrue', analytics.checkAnalyticsCookieIsTrue);
Cypress.Commands.add('checkAnalyticsScriptsAreNotRendered', analytics.checkAnalyticsScriptsAreNotRendered);
Cypress.Commands.add('checkAnalyticsScriptsAreRendered', analytics.checkAnalyticsScriptsAreRendered);

Cypress.Commands.add('checkCookiesConsentBannerDoesNotExist', analytics.checkCookiesConsentBannerDoesNotExist);

Cypress.Commands.add('checkPageNotFoundPageText', require('../../../commands/check-page-not-found-page-text'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('../../../commands/check-header-service-name-href'));
Cypress.Commands.add('checkFooterLinks', require('../../../commands/check-footer-links'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

Cypress.Commands.add('checkAuthenticatedHeader', require('../../../commands/check-authenticated-header'));

Cypress.Commands.add('assertCustomerServiceContactDetailsContent', require('../../../commands/assert-customer-service-contact-details-content'));

Cypress.Commands.add('checkText', require('../../../commands/check-text'));
Cypress.Commands.add('checkValue', require('../../../commands/check-value'));
Cypress.Commands.add('checkRadioInputYesAriaLabel', require('../../../commands/check-radio-input-yes-aria-label'));
Cypress.Commands.add('checkRadioInputNoAriaLabel', require('../../../commands/check-radio-input-no-aria-label'));

Cypress.Commands.add('checkLink', require('../../../commands/check-link'));
Cypress.Commands.add('keyboardInput', require('../../../commands/keyboard-input'));

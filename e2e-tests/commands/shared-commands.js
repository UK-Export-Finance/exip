import '@cypress-audit/lighthouse/commands';

import analytics from './analytics';

Cypress.Commands.add('saveSession', require('./save-session'));

Cypress.Commands.add('login', require('./login'));
Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));
Cypress.Commands.add('navigateToUrl', require('./navigate-to-url'));
Cypress.Commands.add('assertUrl', require('./assert-url'));
Cypress.Commands.add('clickLinkAndAssertUrl', require('./click-link-and-assert-url'));
Cypress.Commands.add('clickBackLink', require('./click-back-link'));

Cypress.Commands.add('corePageChecks', require('./core-page-checks'));

Cypress.Commands.add('submitQuoteAnswersHappyPathSinglePolicy', require('./quote/submit-answers-happy-path-single-policy'));

Cypress.Commands.add('submitInsuranceEligibilityAnswersHappyPath', require('./insurance/eligibility/submit-answers-happy-path'));

Cypress.Commands.add('checkAnalyticsCookiesConsentAndAccept', analytics.checkAnalyticsCookiesConsentAndAccept);
Cypress.Commands.add('checkAnalyticsCookieDoesNotExist', analytics.checkAnalyticsCookieDoesNotExist);
Cypress.Commands.add('checkAnalyticsCookieIsFalse', analytics.checkAnalyticsCookieIsFalse);
Cypress.Commands.add('checkAnalyticsCookieIsTrue', analytics.checkAnalyticsCookieIsTrue);
Cypress.Commands.add('checkAnalyticsScriptsAreNotRendered', analytics.checkAnalyticsScriptsAreNotRendered);
Cypress.Commands.add('checkAnalyticsScriptsAreRendered', analytics.checkAnalyticsScriptsAreRendered);

Cypress.Commands.add('checkCookiesConsentBannerDoesNotExist', analytics.checkCookiesConsentBannerDoesNotExist);

Cypress.Commands.add('checkPageNotFoundPageText', require('./check-page-not-found-page-text'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('./check-header-service-name-href'));
Cypress.Commands.add('checkFooterLinks', require('./check-footer-links'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

Cypress.Commands.add('checkAuthenticatedHeader', require('./check-authenticated-header'));

Cypress.Commands.add('createAccount', require('./insurance/account/create-account'));

Cypress.Commands.add('completeSignInAndGoToApplication', require('./insurance/account/complete-sign-in-and-go-to-application'));

Cypress.Commands.add('completeAndSubmitSignInAccountForm', require('./insurance/account/complete-and-submit-sign-in-account-form'));

Cypress.Commands.add('completeSignInAndOTP', require('./insurance/account/complete-sign-in-and-otp'));

Cypress.Commands.add('accountAddAndGetOTP', require('./insurance/account/add-and-get-OTP'));

Cypress.Commands.add('signInAndAssertAllSectionsUrl', require('./insurance/account/sign-in-and-assert-all-sections-url'));

Cypress.Commands.add('assertCustomerServiceContactDetailsContent', require('./assert-customer-service-contact-details-content'));

Cypress.Commands.add('checkErrorSummaryListHeading', require('./check-error-summary-list-heading'));
Cypress.Commands.add('checkText', require('./check-text'));
Cypress.Commands.add('checkValue', require('./check-value'));
Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));
Cypress.Commands.add('checkRadioInputYesAriaLabel', require('./check-radio-input-yes-aria-label'));
Cypress.Commands.add('checkRadioInputNoAriaLabel', require('./check-radio-input-no-aria-label'));

Cypress.Commands.add('checkTaskStatus', require('./check-task-status'));
Cypress.Commands.add('checkTaskStatusCompleted', require('./check-completed-task-status'));
Cypress.Commands.add('checkLink', require('./check-link'));
Cypress.Commands.add('getReferenceNumber', require('./get-reference-number'));
Cypress.Commands.add('keyboardInput', require('./keyboard-input'));

Cypress.Commands.add('submitAndAssertRadioErrors', require('./submit-and-assert-radio-errors'));
Cypress.Commands.add('submitAndAssertFieldErrors', require('./submit-and-assert-field-errors'));

Cypress.Commands.add('assertPaginationDoesNotExist', require('./pagination/assert-pagination-does-not-exist'));
Cypress.Commands.add('assertPaginationItemLink', require('./pagination/assert-pagination-item-link'));
Cypress.Commands.add('assertPaginationItemEllipsis', require('./pagination/assert-pagination-item-ellipsis'));
Cypress.Commands.add('assertPaginationNextLink', require('./pagination/assert-pagination-next-link'));
Cypress.Commands.add('assertPaginationPreviousLink', require('./pagination/assert-pagination-previous-link'));
Cypress.Commands.add('assertActivePaginationLink', require('./pagination/assert-active-pagination-link'));
Cypress.Commands.add('assertPaginationState', require('./pagination/assert-pagination-state'));

Cypress.Commands.add('assertSummaryListRow', require('./assert-summary-list-row'));
Cypress.Commands.add('assertSummaryListRowKey', require('./assert-summary-list-row-key'));
Cypress.Commands.add('assertSummaryListRowChangeText', require('./assert-summary-list-row-change-text'));
Cypress.Commands.add('assertSummaryListRowValue', require('./assert-summary-list-row-value'));

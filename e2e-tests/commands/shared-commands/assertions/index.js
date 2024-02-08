import analytics from '../../analytics';
import {
  checkBuyerCountryInputHint,
  checkBuyerCountryValidationErrors,
  checkBuyerCountryFocusAfterSummaryErrorClick,
} from './check-buyer-country-form';
import { checkChangeLinkUrl, checkChangeAnswerRendered } from './check-summary-list-field-change';
import {
  checkActionReadAboutEligibility,
  checkActionReadAboutEligibilityLinkRedirect,
  checkActionContactApprovedBroker,
  checkActionTalkToYourNearestEFM,
  checkActionTalkToYourNearestEFMLink,
  checkActionApplyThroughPDF,
  checkActionContactUKEFTeam,
} from './actions';

Cypress.Commands.add('assertUrl', require('./assert-url'));
Cypress.Commands.add('assertSaveAndBackButton', require('./assert-save-and-back-button'));
Cypress.Commands.add('assertSaveAndBackButtonDoesNotExist', require('./assert-save-and-back-button-does-not-exist'));
Cypress.Commands.add('assertYesNoRadiosOrder', require('./assert-first-and-last-radios'));
Cypress.Commands.add('assertRadioOptionIsChecked', require('./assert-radio-option-is-checked'));
Cypress.Commands.add('assertYesRadioOptionIsChecked', require('./assert-yes-radio-option-is-checked'));
Cypress.Commands.add('assertNoRadioOptionIsChecked', require('./assert-no-radio-option-is-checked'));

Cypress.Commands.add('assertHeadingWithCurrencyName', require('./assert-heading-with-currency-name'));
Cypress.Commands.add('assertPrefix', require('./assert-prefix'));

Cypress.Commands.add('checkAnalyticsCookiesConsentAndAccept', analytics.checkAnalyticsCookiesConsentAndAccept);
Cypress.Commands.add('checkAnalyticsCookieDoesNotExist', analytics.checkAnalyticsCookieDoesNotExist);
Cypress.Commands.add('checkAnalyticsCookieIsFalse', analytics.checkAnalyticsCookieIsFalse);
Cypress.Commands.add('checkAnalyticsCookieIsTrue', analytics.checkAnalyticsCookieIsTrue);
Cypress.Commands.add('checkAnalyticsScriptsAreNotRendered', analytics.checkAnalyticsScriptsAreNotRendered);
Cypress.Commands.add('checkAnalyticsScriptsAreRendered', analytics.checkAnalyticsScriptsAreRendered);

Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));

Cypress.Commands.add('checkAuthenticatedHeader', require('./check-authenticated-header'));

Cypress.Commands.add('checkBuyerCountryInputHint', checkBuyerCountryInputHint);
Cypress.Commands.add('checkBuyerCountryValidationErrors', checkBuyerCountryValidationErrors);
Cypress.Commands.add('checkBuyerCountryFocusAfterSummaryErrorClick', checkBuyerCountryFocusAfterSummaryErrorClick);

Cypress.Commands.add('checkChangeLinkUrl', checkChangeLinkUrl);
Cypress.Commands.add('checkChangeAnswerRendered', checkChangeAnswerRendered);

Cypress.Commands.add('checkCookiesConsentBannerDoesNotExist', analytics.checkCookiesConsentBannerDoesNotExist);

Cypress.Commands.add('checkCurrencyOption', require('./check-currency-option'));

Cypress.Commands.add('assertCustomerServiceContactDetailsContent', require('./assert-customer-service-contact-details-content'));

Cypress.Commands.add('checkErrorSummaryListHeading', require('./check-error-summary-list-heading'));

Cypress.Commands.add('checkFooterLinks', require('./check-footer-links'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('./check-header-service-name-href'));

Cypress.Commands.add('checkLink', require('./check-link'));

Cypress.Commands.add('checkPageNotFoundPageText', require('./check-page-not-found-page-text'));

Cypress.Commands.add('assertActivePaginationLink', require('../../pagination/assert-active-pagination-link'));
Cypress.Commands.add('assertPaginationDoesNotExist', require('../../pagination/assert-pagination-does-not-exist'));
Cypress.Commands.add('assertPaginationItemLink', require('../../pagination/assert-pagination-item-link'));
Cypress.Commands.add('assertPaginationItemEllipsis', require('../../pagination/assert-pagination-item-ellipsis'));
Cypress.Commands.add('assertPaginationNextLink', require('../../pagination/assert-pagination-next-link'));
Cypress.Commands.add('assertPaginationPreviousLink', require('../../pagination/assert-pagination-previous-link'));
Cypress.Commands.add('assertPaginationState', require('../../pagination/assert-pagination-state'));

Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));

Cypress.Commands.add('checkRadioInputYesAriaLabel', require('./check-radio-input-yes-aria-label'));
Cypress.Commands.add('checkRadioInputNoAriaLabel', require('./check-radio-input-no-aria-label'));

Cypress.Commands.add('assertSummaryListRow', require('./assert-summary-list-row'));
Cypress.Commands.add('assertSummaryListRowDoesNotExist', require('./assert-summary-list-row-does-not-exist'));
Cypress.Commands.add('assertSummaryListRowKey', require('./assert-summary-list-row-key'));
Cypress.Commands.add('assertSummaryListRowChangeText', require('./assert-summary-list-row-change-text'));
Cypress.Commands.add('assertSummaryListRowValue', require('./assert-summary-list-row-value'));
Cypress.Commands.add('submitAndAssertSummaryListRowValue', require('./submit-and-assert-summary-list-row-value'));

Cypress.Commands.add('assertGenericPolicySummaryListRows', require('./assert-generic-policy-summary-list-rows'));
Cypress.Commands.add('assertGenericSinglePolicySummaryListRows', require('./assert-generic-single-policy-summary-list-rows'));
Cypress.Commands.add('assertGenericMultiplePolicySummaryListRows', require('./assert-generic-multiple-policy-summary-list-rows'));

Cypress.Commands.add('assertDifferentNameOnPolicyFieldValues', require('./assert-different-name-on-policy-field-values'));

Cypress.Commands.add('submitAndAssertChangeAnswersPageUrl', require('./submit-and-assert-change-answers-page-url'));

Cypress.Commands.add('checkTaskStatus', require('./tasks/check-task-status'));

Cypress.Commands.add('checkTaskStatusCannotStart', require('./tasks/check-task-status-cannot-start'));
Cypress.Commands.add('checkTaskStatusNotStartedYet', require('./tasks/check-task-status-not-started-yet'));
Cypress.Commands.add('checkTaskStatusInProgress', require('./tasks/check-task-status-in-progress'));
Cypress.Commands.add('checkTaskStatusCompleted', require('./tasks/check-task-status-complete'));

Cypress.Commands.add('checkTaskEligibilityStatusIsComplete', require('./tasks/eligibility/is-complete'));

Cypress.Commands.add('checkTaskBusinessStatusIsNotStartedYet', require('./tasks/business/is-not-started-yet'));
Cypress.Commands.add('checkTaskBusinessStatusIsInProgress', require('./tasks/business/is-in-progress'));
Cypress.Commands.add('checkTaskBusinessStatusIsComplete', require('./tasks/business/is-complete'));

Cypress.Commands.add('checkTaskBuyerStatusIsNotStartedYet', require('./tasks/buyer/is-not-started-yet'));
Cypress.Commands.add('checkTaskBuyerStatusIsInProgress', require('./tasks/buyer/is-in-progress'));
Cypress.Commands.add('checkTaskBuyerStatusIsComplete', require('./tasks/buyer/is-complete'));

Cypress.Commands.add('checkTaskPolicyStatusIsCannotStart', require('./tasks/policy/is-cannot-start'));
Cypress.Commands.add('checkTaskPolicyStatusIsNotStartedYet', require('./tasks/policy/is-not-started-yet'));
Cypress.Commands.add('checkTaskPolicyStatusIsInProgress', require('./tasks/policy/is-in-progress'));
Cypress.Commands.add('checkTaskPolicyStatusIsComplete', require('./tasks/policy/is-complete'));

Cypress.Commands.add('checkTaskExportContractStatusIsCannotStart', require('./tasks/export-contract/is-cannot-start'));
Cypress.Commands.add('checkTaskExportContractStatusIsNotStartedYet', require('./tasks/export-contract/is-not-started-yet'));
Cypress.Commands.add('checkTaskExportContractStatusIsInProgress', require('./tasks/export-contract/is-in-progress'));
Cypress.Commands.add('checkTaskExportContractStatusIsComplete', require('./tasks/export-contract/is-complete'));

Cypress.Commands.add('checkTaskCheckAnswersStatusIsNotStartedYet', require('./tasks/check-answers/is-not-started-yet'));
Cypress.Commands.add('checkTaskCheckAnswersStatusIsInProgress', require('./tasks/check-answers/is-in-progress'));
Cypress.Commands.add('checkTaskCheckAnswersStatusIsComplete', require('./tasks/check-answers/is-complete'));

Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsNotStartedYet', require('./tasks/declarations-and-submit/is-not-started-yet'));
Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsInProgress', require('./tasks/declarations-and-submit/is-in-progress'));
Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsComplete', require('./tasks/declarations-and-submit/is-complete'));

Cypress.Commands.add('checkText', require('./check-text'));
Cypress.Commands.add('checkValue', require('./check-value'));

Cypress.Commands.add('checkActionReadAboutEligibility', checkActionReadAboutEligibility);
Cypress.Commands.add('checkActionReadAboutEligibilityLinkRedirect', checkActionReadAboutEligibilityLinkRedirect);
Cypress.Commands.add('checkActionContactApprovedBroker', checkActionContactApprovedBroker);
Cypress.Commands.add('checkActionTalkToYourNearestEFM', checkActionTalkToYourNearestEFM);
Cypress.Commands.add('checkActionTalkToYourNearestEFMLink', checkActionTalkToYourNearestEFMLink);
Cypress.Commands.add('checkActionApplyThroughPDF', checkActionApplyThroughPDF);
Cypress.Commands.add('checkActionContactUKEFTeam', checkActionContactUKEFTeam);

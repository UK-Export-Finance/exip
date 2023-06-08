// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@cypress-audit/lighthouse/commands';
import 'cypress-v10-preserve-cookie';

import analytics from './analytics';

Cypress.Commands.add('saveSession', require('./save-session'));

Cypress.Commands.add('login', require('./login'));
Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));
Cypress.Commands.add('navigateToUrl', require('./navigate-to-url'));
Cypress.Commands.add('assertUrl', require('./assert-url'));
Cypress.Commands.add('clickBackLink', require('./click-back-link'));

Cypress.Commands.add('submitQuoteAnswersHappyPathSinglePolicy', require('./quote/submit-answers-happy-path-single-policy'));
Cypress.Commands.add('submitQuoteAnswersHappyPathMultiplePolicy', require('./quote/submit-answers-happy-path-multiple-policy'));

Cypress.Commands.add('corePageChecks', require('./core-page-checks'));

Cypress.Commands.add('checkAnalyticsCookiesConsentAndAccept', analytics.checkAnalyticsCookiesConsentAndAccept);
Cypress.Commands.add('checkAnalyticsCookieDoesNotExist', analytics.checkAnalyticsCookieDoesNotExist);
Cypress.Commands.add('checkAnalyticsCookieIsFalse', analytics.checkAnalyticsCookieIsFalse);
Cypress.Commands.add('checkAnalyticsCookieIsTrue', analytics.checkAnalyticsCookieIsTrue);
Cypress.Commands.add('checkAnalyticsScriptsAreNotRendered', analytics.checkAnalyticsScriptsAreNotRendered);
Cypress.Commands.add('checkAnalyticsScriptsAreRendered', analytics.checkAnalyticsScriptsAreRendered);

Cypress.Commands.add('checkCookiesConsentBannerIsNotVisible', analytics.checkCookiesConsentBannerIsNotVisible);
Cypress.Commands.add('checkCookiesConsentBannerIsVisible', analytics.checkCookiesConsentBannerIsVisible);
Cypress.Commands.add('checkCookiesConsentBannerDoesNotExist', analytics.checkCookiesConsentBannerDoesNotExist);

Cypress.Commands.add('checkPageNotFoundPageText', require('./check-page-not-found-page-text'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('./check-header-service-name-href'));
Cypress.Commands.add('checkFooterLinks', require('./check-footer-links'));

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

Cypress.Commands.add('checkAuthenticatedHeader', require('./check-authenticated-header'));

Cypress.Commands.add('submitInsuranceEligibilityAnswersHappyPath', require('./insurance/eligibility/submit-answers-happy-path'));
Cypress.Commands.add('submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath', require('./insurance/eligibility/submit-answers-from-buyer-country-happy-path'));

Cypress.Commands.add('submitInsuranceEligibilityAndStartApplication', require('./insurance/submit-eligibility-and-start-an-application'));

Cypress.Commands.add('submitEligibilityAndStartAccountCreation', require('./insurance/submit-eligibility-and-start-account-creation'));
Cypress.Commands.add('submitEligibilityAndStartAccountSignIn', require('./insurance/submit-eligibility-and-start-account-sign-in'));

Cypress.Commands.add('completeAndSubmitCreateAccountForm', require('./insurance/account/complete-and-submit-create-account-form'));
Cypress.Commands.add('completeAndSubmitSignInAccountForm', require('./insurance/account/complete-and-submit-sign-in-account-form'));
Cypress.Commands.add('completeAndSubmitSignInAccountFormMaximumRetries', require('./insurance/account/complete-and-submit-sign-in-account-form-maximum-retries'));
Cypress.Commands.add('completeAndSubmitEnterCodeAccountForm', require('./insurance/account/complete-and-submit-enter-code-account-form'));

Cypress.Commands.add('completeAndSubmitPasswordResetForm', require('./insurance/account/complete-and-submit-password-reset-form'));
Cypress.Commands.add('completeAndSubmitPasswordResetFormMaximumRetries', require('./insurance/account/complete-and-submit-password-reset-form-maximum-retries'));
Cypress.Commands.add('completeAndSubmitNewPasswordAccountForm', require('./insurance/account/complete-and-submit-new-password-account-form'));

Cypress.Commands.add('getAccountByEmail', require('./insurance/account/get-account-by-email'));
Cypress.Commands.add('verifyAccountEmail', require('./insurance/account/verify-account-email'));

Cypress.Commands.add('deleteAccount', require('./insurance/account/delete-account'));
Cypress.Commands.add('deleteApplication', require('./insurance/delete-application'));

Cypress.Commands.add('createAccount', require('./insurance/account/create-account'));

Cypress.Commands.add('createAnAccountAndBecomeBlocked', require('./insurance/account/create-an-account-and-become-blocked'));

Cypress.Commands.add('accountAddAndGetOTP', require('./insurance/account/add-and-get-OTP'));

Cypress.Commands.add('completeInsuranceEligibilitySignInAndGoToDashboard', require('./insurance/account/complete-insurance-eligibility-sign-in-and-go-to-dashboard'));
Cypress.Commands.add('completeSignInAndGoToDashboard', require('./insurance/account/complete-sign-in-and-go-to-dashboard'));

Cypress.Commands.add('completeSignInAndGoToApplication', require('./insurance/account/complete-sign-in-and-go-to-application'));

Cypress.Commands.add('signInAndGoToUrl', require('./insurance/account/sign-in-and-go-to-url'));

Cypress.Commands.add('completeAndSubmitPolicyTypeForm', require('./insurance/complete-and-submit-policy-type-form'));
Cypress.Commands.add('completeAndSubmitSingleContractPolicyForm', require('./insurance/complete-and-submit-single-contract-policy-form'));
Cypress.Commands.add('completeAndSubmitMultipleContractPolicyForm', require('./insurance/complete-and-submit-multiple-contract-policy-form'));

Cypress.Commands.add('completeAndSubmitAboutGoodsOrServicesForm', require('./insurance/complete-and-submit-about-goods-or-services-form'));

Cypress.Commands.add('completeAndSubmitCompanyDetails', require('./insurance/complete-and-submit-company-details'));
Cypress.Commands.add('completeCompanyDetailsForm', require('./insurance/complete-company-details-form'));
Cypress.Commands.add('completeAndSubmitCompaniesHouseSearchForm', require('./insurance/complete-and-submit-companies-house-search-form'));

Cypress.Commands.add('completeAndSubmitYourContact', require('./insurance/complete-and-submit-your-contact-form'));
Cypress.Commands.add('completeAndSubmitNatureOfYourBusiness', require('./insurance/complete-and-submit-nature-of-your-business'));
Cypress.Commands.add('completeAndSubmitTurnoverForm', require('./insurance/complete-and-submit-turnover-form'));
Cypress.Commands.add('completeAndSubmitBrokerForm', require('./insurance/complete-and-submit-broker-form'));

Cypress.Commands.add('completePrepareApplicationSinglePolicyType', require('./insurance/complete-prepare-your-application-section-single'));
Cypress.Commands.add('completePrepareApplicationMultiplePolicyType', require('./insurance/complete-prepare-your-application-section-multiple'));

Cypress.Commands.add('completeAndSubmitCompanyOrOrganisationForm', require('./insurance/your-buyer/complete-and-submit-company-or-organisation-form'));
Cypress.Commands.add('completeAndSubmitWorkingWithBuyerForm', require('./insurance/your-buyer/complete-and-submit-working-with-buyer-form'));

Cypress.Commands.add('submitCheckYourAnswersForm', require('./insurance/check-your-answers/submit-form'));
Cypress.Commands.add('completeAndSubmitCheckYourAnswers', require('./insurance/check-your-answers/submit-check-your-answers'));

Cypress.Commands.add('completeAndSubmitDeclarationConfidentiality', require('./insurance/declarations/complete-and-submit-confidentiality-form'));
Cypress.Commands.add('completeAndSubmitDeclarationAntiBribery', require('./insurance/declarations/complete-and-submit-anti-bribery-form'));
Cypress.Commands.add('completeAndSubmitDeclarationAntiBriberyCodeOfConduct', require('./insurance/declarations/complete-and-submit-anti-bribery-code-of-conduct-form'));
Cypress.Commands.add('completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct', require('./insurance/declarations/complete-and-submit-anti-bribery-exporting-with-code-of-conduct-form'));
Cypress.Commands.add('completeAndSubmitDeclarationConfirmationAndAcknowledgements', require('./insurance/declarations/complete-and-submit-confirmation-and-acknowledgements-form'));
Cypress.Commands.add('completeAndSubmitDeclarationHowYourDataWillBeUsed', require('./insurance/declarations/complete-and-submit-how-your-data-will-be-used-form'));

Cypress.Commands.add('completeAndSubmitDeclarations', require('./insurance/complete-declarations'));
Cypress.Commands.add('completeSignInAndSubmitAnApplication', require('./insurance/complete-sign-in-and-submit-an-application'));

Cypress.Commands.add('assertAllSectionsUrl', require('./insurance/assert-all-sections-url'));

Cypress.Commands.add('assertChangeAnswersPageUrl', require('./insurance/assert-change-answers-page-url'));
Cypress.Commands.add('assertSummaryListRowValue', require('./assert-summary-list-row-value'));
Cypress.Commands.add('assertSummaryListRowValueNew', require('./assert-summary-list-row-value-new'));
Cypress.Commands.add('submitAndAssertRadioErrors', require('./submit-and-assert-radio-errors'));
Cypress.Commands.add('submitAndAssertFieldErrors', require('./submit-and-assert-field-errors'));

Cypress.Commands.add('assertPasswordLabelHintAndInput', require('./insurance/account/assert-password-label-hint-and-input'));
Cypress.Commands.add('assertPasswordRevealButton', require('./insurance/account/assert-password-reveal-button'));
Cypress.Commands.add('assertConfirmEmailPageContent', require('./insurance/account/assert-confirm-email-page-content'));

Cypress.Commands.add('assertSubmitAndSaveButtons', require('./insurance/assert-submit-and-save-buttons'));

Cypress.Commands.add('assertUncheckedYesNoRadios', require('./assert-unchecked-yes-no-radios'));

Cypress.Commands.add('assertCustomerServiceContactDetailsContent', require('./assert-customer-service-contact-details-content'));

Cypress.Commands.add('checkText', require('./check-text'));
Cypress.Commands.add('checkValue', require('./check-value'));
Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));
Cypress.Commands.add('checkTaskStatus', require('./check-task-status'));
Cypress.Commands.add('checkTaskStatusCompleted', require('./check-completed-task-status'));
Cypress.Commands.add('checkLink', require('./check-link'));
Cypress.Commands.add('getReferenceNumber', require('./get-reference-number'));
Cypress.Commands.add('keyboardInput', require('./keyboard-input'));

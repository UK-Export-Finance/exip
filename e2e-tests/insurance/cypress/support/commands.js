// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@cypress-audit/lighthouse/commands';
import 'cypress-v10-preserve-cookie';

Cypress.Commands.add('submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath', require('../../../commands/insurance/eligibility/submit-answers-from-buyer-country-happy-path'));

Cypress.Commands.add('submitEligibilityAndStartAccountCreation', require('../../../commands/insurance/submit-eligibility-and-start-account-creation'));
Cypress.Commands.add('submitEligibilityAndStartAccountSignIn', require('../../../commands/insurance/submit-eligibility-and-start-account-sign-in'));

Cypress.Commands.add('completeAndSubmitCreateAccountForm', require('../../../commands/insurance/account/complete-and-submit-create-account-form'));
Cypress.Commands.add('completeAndSubmitSignInAccountFormMaximumInvalidRetries', require('../../../commands/insurance/account/complete-and-submit-sign-in-account-form-maximum-invalid-retries'));
Cypress.Commands.add('completeAndSubmitEnterCodeAccountForm', require('../../../commands/insurance/account/complete-and-submit-enter-code-account-form'));

Cypress.Commands.add('completeAndSubmitPasswordResetForm', require('../../../commands/insurance/account/complete-and-submit-password-reset-form'));
Cypress.Commands.add('completeAndSubmitPasswordResetFormMaximumRetries', require('../../../commands/insurance/account/complete-and-submit-password-reset-form-maximum-retries'));
Cypress.Commands.add('completeAndSubmitNewPasswordAccountForm', require('../../../commands/insurance/account/complete-and-submit-new-password-account-form'));

Cypress.Commands.add('getAccountByEmail', require('../../../commands/insurance/account/get-account-by-email'));
Cypress.Commands.add('verifyAccountEmail', require('../../../commands/insurance/account/verify-account-email'));

Cypress.Commands.add('createAnApplication', require('../../../commands/insurance/create-an-application'));
Cypress.Commands.add('createApplications', require('../../../commands/insurance/create-applications'));

Cypress.Commands.add('deleteAccount', require('../../../commands/insurance/account/delete-account'));
Cypress.Commands.add('deleteApplication', require('../../../commands/insurance/delete-application'));
Cypress.Commands.add('deleteApplications', require('../../../commands/insurance/delete-applications'));

Cypress.Commands.add('createAnAccountAndBecomeBlocked', require('../../../commands/insurance/account/create-an-account-and-become-blocked'));

Cypress.Commands.add('completeSignInAndGoToDashboard', require('../../../commands/insurance/account/complete-sign-in-and-go-to-dashboard'));

Cypress.Commands.add('signInAndGoToUrl', require('../../../commands/insurance/account/sign-in-and-go-to-url'));

Cypress.Commands.add('completeAndSubmitPolicyTypeForm', require('../../../commands/insurance/complete-and-submit-policy-type-form'));
Cypress.Commands.add('completeAndSubmitSingleContractPolicyForm', require('../../../commands/insurance/complete-and-submit-single-contract-policy-form'));
Cypress.Commands.add('completeAndSubmitMultipleContractPolicyForm', require('../../../commands/insurance/complete-and-submit-multiple-contract-policy-form'));

Cypress.Commands.add('completeAndSubmitAboutGoodsOrServicesForm', require('../../../commands/insurance/complete-and-submit-about-goods-or-services-form'));

Cypress.Commands.add('completeNameOnPolicyForm', require('../../../commands/insurance/complete-name-on-policy-form'));
Cypress.Commands.add('completeAndSubmitNameOnPolicyForm', require('../../../commands/insurance/complete-and-submit-name-on-policy-form'));
Cypress.Commands.add('completeDifferentNameOnPolicyForm', require('../../../commands/insurance/complete-different-name-on-policy-form'));
Cypress.Commands.add('completeAndSubmitDifferentNameOnPolicyForm', require('../../../commands/insurance/complete-and-submit-different-name-on-policy-form'));

Cypress.Commands.add('completeAndSubmitCompanyDetails', require('../../../commands/insurance/complete-and-submit-company-details'));
Cypress.Commands.add('completeCompanyDetailsForm', require('../../../commands/insurance/complete-company-details-form'));
Cypress.Commands.add('completeAndSubmitCompaniesHouseSearchForm', require('../../../commands/insurance/complete-and-submit-companies-house-number-search-form'));

Cypress.Commands.add('completeAndSubmitNatureOfYourBusiness', require('../../../commands/insurance/complete-and-submit-nature-of-your-business'));
Cypress.Commands.add('completeAndSubmitTurnoverForm', require('../../../commands/insurance/complete-and-submit-turnover-form'));
Cypress.Commands.add('completeAndSubmitBrokerForm', require('../../../commands/insurance/complete-and-submit-broker-form'));

Cypress.Commands.add('completePrepareApplicationSinglePolicyType', require('../../../commands/insurance/complete-prepare-application-section-single-policy-type'));
Cypress.Commands.add('completePrepareApplicationMultiplePolicyType', require('../../../commands/insurance/complete-prepare-application-section-multiple-policy-type'));

Cypress.Commands.add('completeAndSubmitCompanyOrOrganisationForm', require('../../../commands/insurance/your-buyer/complete-and-submit-company-or-organisation-form'));
Cypress.Commands.add('completeAndSubmitWorkingWithBuyerForm', require('../../../commands/insurance/your-buyer/complete-and-submit-working-with-buyer-form'));

Cypress.Commands.add('submitCheckYourAnswersForm', require('../../../commands/insurance/check-your-answers/submit-form'));
Cypress.Commands.add('completeAndSubmitCheckYourAnswers', require('../../../commands/insurance/check-your-answers/submit-check-your-answers'));

Cypress.Commands.add('completeAndSubmitDeclarationConfidentiality', require('../../../commands/insurance/declarations/complete-and-submit-confidentiality-form'));
Cypress.Commands.add('completeAndSubmitDeclarationAntiBribery', require('../../../commands/insurance/declarations/complete-and-submit-anti-bribery-form'));
Cypress.Commands.add('completeAndSubmitDeclarationAntiBriberyCodeOfConduct', require('../../../commands/insurance/declarations/complete-and-submit-anti-bribery-code-of-conduct-form'));
Cypress.Commands.add('completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct', require('../../../commands/insurance/declarations/complete-and-submit-anti-bribery-exporting-with-code-of-conduct-form'));
Cypress.Commands.add('completeAndSubmitDeclarationConfirmationAndAcknowledgements', require('../../../commands/insurance/declarations/complete-and-submit-confirmation-and-acknowledgements-form'));
Cypress.Commands.add('completeAndSubmitDeclarationHowYourDataWillBeUsed', require('../../../commands/insurance/declarations/complete-and-submit-how-your-data-will-be-used-form'));

Cypress.Commands.add('completeAndSubmitDeclarations', require('../../../commands/insurance/complete-declarations'));
Cypress.Commands.add('completeSignInAndSubmitAnApplication', require('../../../commands/insurance/complete-sign-in-and-submit-an-application'));

Cypress.Commands.add('assertAllSectionsUrl', require('../../../commands/insurance/assert-all-sections-url'));
Cypress.Commands.add('assertApplicationSubmittedUrl', require('../../../commands/insurance/assert-application-submitted-url'));

Cypress.Commands.add('assertChangeAnswersPageUrl', require('../../../commands/insurance/assert-change-answers-page-url'));
Cypress.Commands.add('assertSummaryListRowValue', require('../../../commands/assert-summary-list-row-value'));
Cypress.Commands.add('assertSummaryListRowValueNew', require('../../../commands/assert-summary-list-row-value-new'));

Cypress.Commands.add('assertPasswordLabelHintAndInput', require('../../../commands/insurance/account/assert-password-label-hint-and-input'));
Cypress.Commands.add('assertPasswordRevealButton', require('../../../commands/insurance/account/assert-password-reveal-button'));
Cypress.Commands.add('assertConfirmEmailPageContent', require('../../../commands/insurance/account/assert-confirm-email-page-content'));

Cypress.Commands.add('assertSubmitAndSaveButtons', require('../../../commands/insurance/assert-submit-and-save-buttons'));

Cypress.Commands.add('assertUncheckedYesNoRadios', require('../../../commands/assert-unchecked-yes-no-radios'));

Cypress.Commands.add('interceptCompaniesHousePost', require('../../../commands/intercept/companies-house-post'));

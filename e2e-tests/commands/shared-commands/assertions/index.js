import { checkChangeLinkUrl, checkChangeAnswerRendered } from './check-summary-list-field-change';

import './actions';
import './analytics';
import './buyer-country';
import './pagination';
import './summary-lists';
import './tasks';

Cypress.Commands.add('assertUrl', require('./assert-url'));
Cypress.Commands.add('assertSaveAndBackButton', require('./assert-save-and-back-button'));
Cypress.Commands.add('assertSaveAndBackButtonDoesNotExist', require('./assert-save-and-back-button-does-not-exist'));
Cypress.Commands.add('assertYesNoRadiosOrder', require('./assert-first-and-last-radios'));
Cypress.Commands.add('assertRadioOptionIsChecked', require('./assert-radio-option-is-checked'));
Cypress.Commands.add('assertRadioOptionIsNotChecked', require('./assert-radio-option-is-not-checked'));
Cypress.Commands.add('assertYesRadioOptionIsChecked', require('./assert-yes-radio-option-is-checked'));
Cypress.Commands.add('assertYesRadioOptionIsNotChecked', require('./assert-yes-radio-option-is-not-checked'));
Cypress.Commands.add('assertNoRadioOptionIsChecked', require('./assert-no-radio-option-is-checked'));
Cypress.Commands.add('assertNoRadioOptionIsNotChecked', require('./assert-no-radio-option-is-not-checked'));
Cypress.Commands.add('assertLength', require('./assert-length'));
Cypress.Commands.add('assertErrorSummaryListLength', require('./assert-error-summary-list-length'));
Cypress.Commands.add('assertErrorSummaryListDoesNotExist', require('./assert-error-summary-list-does-not-exist'));
Cypress.Commands.add('assertCurrencyFormFieldsAreEmpty', require('./assert-currency-form-fields-are-empty'));
Cypress.Commands.add('assertNameEmailAndPositionFields', require('./assert-name-email-and-position-fields'));

Cypress.Commands.add('assertCopyWithCurrencyName', require('./assert-copy-with-currency-name'));
Cypress.Commands.add('assertEmptyAutocompleteFieldValue', require('./assert-empty-autocomplete-field-value'));
Cypress.Commands.add('assertEmptyFieldValue', require('./assert-empty-field-value'));
Cypress.Commands.add('assertEmptyTextareaFieldValue', require('./assert-empty-textarea-field-value'));
Cypress.Commands.add('assertPrefix', require('./assert-prefix'));
Cypress.Commands.add('assertSuffix', require('./assert-suffix'));
Cypress.Commands.add('assertTextareaRendering', require('./assert-textarea-rendering'));
Cypress.Commands.add('assertDynamicCharacterCount', require('./assert-dynamic-character-count'));

Cypress.Commands.add('assertContactDetailsContent', require('./assert-contact-details-content'));

Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));
Cypress.Commands.add('checkClassName', require('./check-class-name'));
Cypress.Commands.add('checkEmailFieldRendering', require('./check-email-field-rendering'));
Cypress.Commands.add('checkIntroText', require('./check-intro-text'));
Cypress.Commands.add('checkLink', require('./check-link'));
Cypress.Commands.add('checkText', require('./check-text'));
Cypress.Commands.add('checkTextAndValue', require('./check-text-and-value'));
Cypress.Commands.add('checkTextareaValue', require('./check-textarea-value'));
Cypress.Commands.add('checkTypeAttribute', require('./check-type-attribute'));
Cypress.Commands.add('checkValue', require('./check-value'));
Cypress.Commands.add('checkDateFieldValues', require('./check-date-field-values'));

Cypress.Commands.add('checkAuthenticatedHeader', require('./check-authenticated-header'));

Cypress.Commands.add('checkChangeLinkUrl', checkChangeLinkUrl);
Cypress.Commands.add('checkChangeAnswerRendered', checkChangeAnswerRendered);

Cypress.Commands.add('checkCurrencyOption', require('./check-currency-option'));

Cypress.Commands.add('checkErrorSummaryListHeading', require('./check-error-summary-list-heading'));

Cypress.Commands.add('checkFooterLinks', require('./check-footer-links'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('./check-header-service-name-href'));

Cypress.Commands.add('checkPageNotFoundPageText', require('./check-page-not-found-page-text'));

Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));

Cypress.Commands.add('checkRadioInputYesAriaLabel', require('./check-radio-input-yes-aria-label'));
Cypress.Commands.add('checkRadioInputNoAriaLabel', require('./check-radio-input-no-aria-label'));

Cypress.Commands.add('assertConnectionWithBuyerFieldValues', require('./assert-connection-with-buyer-field-values'));

Cypress.Commands.add('assertEmptyOverdueOrOutstandingFieldValues', require('./assert-empty-overdue-or-outstanding-field-values'));

Cypress.Commands.add('assertEnterAddressManuallyLink', require('./assert-enter-address-manually-link'));

Cypress.Commands.add('assertDifferentNameOnPolicyFieldValues', require('./assert-different-name-on-policy-field-values'));
Cypress.Commands.add('assertOtherCompanyDetailsFieldValues', require('./assert-other-company-details-field-values'));
Cypress.Commands.add('assertEmptyOtherCompanyDetailsFieldValues', require('./assert-empty-other-company-details-field-values'));

Cypress.Commands.add('assertBrokerDetailsFieldValues', require('./assert-broker-details-field-values'));

Cypress.Commands.add('assertEmptyLossPayeeDetailsFieldValues', require('./assert-empty-loss-payee-details-field-values'));
Cypress.Commands.add('assertLossPayeeFinancialUkFieldValues', require('./assert-loss-payee-financial-uk-field-values'));
Cypress.Commands.add('assertEmptyLossPayeeFinancialUkFieldValues', require('./assert-empty-loss-payee-financial-uk-field-values'));
Cypress.Commands.add('assertLossPayeeFinancialInternationalFieldValues', require('./assert-loss-payee-financial-international-field-values'));
Cypress.Commands.add('assertEmptyLossPayeeFinancialInternationalFieldValues', require('./assert-empty-loss-payee-financial-international-field-values'));

Cypress.Commands.add('assertHowWasTheContractAwardedFieldValues', require('./assert-how-was-the-contract-awarded-field-values'));
Cypress.Commands.add('assertAgentDetailsFieldValues', require('./assert-agent-details-field-values'));
Cypress.Commands.add('assertEmptyAgentDetailsFieldValues', require('./assert-empty-agent-details-field-values'));

Cypress.Commands.add('assertAgentServiceFieldValues', require('./assert-agent-service-field-values'));
Cypress.Commands.add('assertEmptyAgentServiceFieldValues', require('./assert-empty-agent-service-field-values'));

Cypress.Commands.add('assertAgentChargesFieldValues', require('./assert-agent-charges-field-values'));
Cypress.Commands.add('assertEmptyAgentChargesFieldValues', require('./assert-empty-agent-charges-field-values'));

Cypress.Commands.add('assertEmptyContractCompletionDateFieldValues', require('./assert-empty-contract-completion-date-field-values'));
Cypress.Commands.add('assertEmptyRequestedStartDateFieldValues', require('./assert-empty-requested-start-date-field-values'));

Cypress.Commands.add('submitAndAssertChangeAnswersPageUrl', require('./submit-and-assert-change-answers-page-url'));

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
Cypress.Commands.add('assertYesRadioOptionIsChecked', require('./assert-yes-radio-option-is-checked'));
Cypress.Commands.add('assertNoRadioOptionIsChecked', require('./assert-no-radio-option-is-checked'));

Cypress.Commands.add('assertHeadingWithCurrencyName', require('./assert-heading-with-currency-name'));
Cypress.Commands.add('assertPrefix', require('./assert-prefix'));

Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));
Cypress.Commands.add('checkLink', require('./check-link'));
Cypress.Commands.add('checkText', require('./check-text'));
Cypress.Commands.add('checkIntroText', require('./check-intro-text'));
Cypress.Commands.add('checkValue', require('./check-value'));

Cypress.Commands.add('checkAuthenticatedHeader', require('./check-authenticated-header'));

Cypress.Commands.add('checkChangeLinkUrl', checkChangeLinkUrl);
Cypress.Commands.add('checkChangeAnswerRendered', checkChangeAnswerRendered);

Cypress.Commands.add('checkCurrencyOption', require('./check-currency-option'));

Cypress.Commands.add('assertCustomerServiceContactDetailsContent', require('./assert-customer-service-contact-details-content'));

Cypress.Commands.add('checkErrorSummaryListHeading', require('./check-error-summary-list-heading'));

Cypress.Commands.add('checkFooterLinks', require('./check-footer-links'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('./check-header-service-name-href'));

Cypress.Commands.add('checkPageNotFoundPageText', require('./check-page-not-found-page-text'));

Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));

Cypress.Commands.add('checkRadioInputYesAriaLabel', require('./check-radio-input-yes-aria-label'));
Cypress.Commands.add('checkRadioInputNoAriaLabel', require('./check-radio-input-no-aria-label'));

Cypress.Commands.add('assertDifferentNameOnPolicyFieldValues', require('./assert-different-name-on-policy-field-values'));

Cypress.Commands.add('submitAndAssertChangeAnswersPageUrl', require('./submit-and-assert-change-answers-page-url'));

Cypress.Commands.add('assertAllSectionsUrl', require('../../../../commands/insurance/assert-all-sections-url'));
Cypress.Commands.add('assertApplicationSubmittedUrl', require('../../../../commands/insurance/assert-application-submitted-url'));

Cypress.Commands.add('assertChangeAnswersPageUrl', require('../../../../commands/insurance/assert-change-answers-page-url'));
Cypress.Commands.add('assertSummaryListRowValue', require('../../../../commands/shared-commands/assertions/assert-summary-list-row-value'));

Cypress.Commands.add('assertPasswordLabelHintAndInput', require('../../../../commands/insurance/account/assert-password-label-hint-and-input'));
Cypress.Commands.add('assertPasswordRevealButton', require('../../../../commands/insurance/account/assert-password-reveal-button'));
Cypress.Commands.add('assertConfirmEmailPageContent', require('../../../../commands/insurance/account/assert-confirm-email-page-content'));

Cypress.Commands.add('assertSubmitAndSaveButtons', require('../../../../commands/insurance/assert-submit-and-save-buttons'));

Cypress.Commands.add('assertUncheckedYesNoRadios', require('../../../../commands/shared-commands/assertions/assert-unchecked-yes-no-radios'));

Cypress.Commands.add(
  'assertDashboardApplicationNumberLinkDoesNotExist',
  require('../../../../commands/insurance/assert-dashboard-application-number-link-does-not-exist'),
);
Cypress.Commands.add('assertDashboardApplicationSubmittedStatus', require('../../../../commands/insurance/assert-dashboard-application-submitted-status'));

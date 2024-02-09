Cypress.Commands.add('assertSummaryListRow', require('./assert-summary-list-row'));
Cypress.Commands.add('assertSummaryListRowDoesNotExist', require('./assert-summary-list-row-does-not-exist'));
Cypress.Commands.add('assertSummaryListRowKey', require('./assert-summary-list-row-key'));
Cypress.Commands.add('assertSummaryListRowChangeText', require('./assert-summary-list-row-change-text'));
Cypress.Commands.add('assertSummaryListRowValue', require('./assert-summary-list-row-value'));
Cypress.Commands.add('submitAndAssertSummaryListRowValue', require('./submit-and-assert-summary-list-row-value'));

Cypress.Commands.add('assertGenericPolicySummaryListRows', require('./assert-generic-policy-summary-list-rows'));
Cypress.Commands.add('assertGenericSinglePolicySummaryListRows', require('./assert-generic-single-policy-summary-list-rows'));
Cypress.Commands.add('assertGenericMultiplePolicySummaryListRows', require('./assert-generic-multiple-policy-summary-list-rows'));

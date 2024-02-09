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

Cypress.Commands.add('checkTaskCheckAnswersStatusIsCannotStart', require('./tasks/check-answers/is-cannot-start'));
Cypress.Commands.add('checkTaskCheckAnswersStatusIsNotStartedYet', require('./tasks/check-answers/is-not-started-yet'));
Cypress.Commands.add('checkTaskCheckAnswersStatusIsInProgress', require('./tasks/check-answers/is-in-progress'));
Cypress.Commands.add('checkTaskCheckAnswersStatusIsComplete', require('./tasks/check-answers/is-complete'));

Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsCannotStart', require('./tasks/declarations-and-submit/is-cannot-start'));
Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsNotStartedYet', require('./tasks/declarations-and-submit/is-not-started-yet'));
Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsInProgress', require('./tasks/declarations-and-submit/is-in-progress'));
Cypress.Commands.add('checkTaskDeclarationsAndSubmitStatusIsComplete', require('./tasks/declarations-and-submit/is-complete'));

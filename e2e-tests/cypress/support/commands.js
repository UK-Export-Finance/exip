// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-audit/commands';

Cypress.Commands.add('login', require('./login'));
Cypress.Commands.add('submitAnswersHappyPath', require('./submit-answers-happy-path'));
Cypress.Commands.add('submitAnswersHappyPathNew', require('./submit-answers-happy-path-new'));

// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-audit/commands';

Cypress.Commands.add('login', require('./login'));
Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));
Cypress.Commands.add('submitAnswersHappyPathSinglePolicy', require('./quote/submit-answers-happy-path-single-policy'));
Cypress.Commands.add('submitAnswersHappyPathMultiPolicy', require('./quote/submit-answers-happy-path-multi-policy'));

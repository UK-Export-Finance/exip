// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@cypress-audit/lighthouse/commands';
import 'cypress-v10-preserve-cookie';

Cypress.Commands.add('saveSession', require('../../../commands/save-session'));

Cypress.Commands.add('navigateToUrl', require('../../../commands/navigate-to-url'));
Cypress.Commands.add('assertUrl', require('../../../commands/assert-url'));

Cypress.Commands.add('submitQuoteAnswersHappyPathSinglePolicy', require('../../../commands/quote/submit-answers-happy-path-single-policy'));

Cypress.Commands.add('submitInsuranceEligibilityAndStartApplication', require('../../../commands/insurance/submit-eligibility-and-start-an-application'));

Cypress.Commands.add('keyboardInput', require('../../../commands/keyboard-input'));

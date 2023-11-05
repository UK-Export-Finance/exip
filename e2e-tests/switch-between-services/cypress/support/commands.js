// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@cypress-audit/lighthouse/commands';

Cypress.Commands.add('submitInsuranceEligibilityAndStartApplication', require('../../../commands/insurance/submit-eligibility-and-start-an-application'));

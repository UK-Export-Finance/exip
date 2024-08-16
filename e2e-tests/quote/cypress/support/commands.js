// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@cypress-audit/lighthouse/commands';

import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourSinglePolicyForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from '../../../commands/quote/forms';

Cypress.Commands.add('submitQuoteAnswersHappyPathMultiplePolicy', require('../../../commands/quote/submit-answers-happy-path-multiple-policy'));

Cypress.Commands.add('completeAndSubmitBuyerBodyForm', completeAndSubmitBuyerBodyForm);
Cypress.Commands.add('completeAndSubmitExporterLocationForm', completeAndSubmitExporterLocationForm);
Cypress.Commands.add('completeAndSubmitUkContentForm', completeAndSubmitUkContentForm);
Cypress.Commands.add('completeAndSubmitPolicyTypeSingleForm', completeAndSubmitPolicyTypeSingleForm);
Cypress.Commands.add('completeAndSubmitPolicyTypeMultiForm', completeAndSubmitPolicyTypeMultiForm);
Cypress.Commands.add('completeAndSubmitTellUsAboutYourSinglePolicyForm', completeAndSubmitTellUsAboutYourSinglePolicyForm);
Cypress.Commands.add('completeAndSubmitTellUsAboutYourMultiPolicyForm', completeAndSubmitTellUsAboutYourMultiPolicyForm);

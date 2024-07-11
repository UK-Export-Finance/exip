import './business';
import './buyer';
import './check-your-answers';
import './export-contract';
import './policy';

Cypress.Commands.add('createAnApplication', require('../../../../commands/insurance/create-an-application'));
Cypress.Commands.add('createApplications', require('../../../../commands/insurance/create-applications'));
Cypress.Commands.add('createAnAbandonedApplication', require('../../../../commands/insurance/create-an-abandoned-application'));

Cypress.Commands.add('deleteApplication', require('../../../../commands/insurance/delete-application'));
Cypress.Commands.add('deleteApplications', require('../../../../commands/insurance/delete-applications'));

Cypress.Commands.add('startYourBusinessSection', require('../../../../commands/insurance/start-your-business-section'));

Cypress.Commands.add('startInsuranceYourBuyerSection', require('../../../../commands/insurance/start-your-buyer-section'));

Cypress.Commands.add('startInsurancePolicySection', require('../../../../commands/insurance/start-insurance-policy-section'));
Cypress.Commands.add('startInsuranceExportContractSection', require('../../../../commands/insurance/start-insurance-export-contract-section'));

Cypress.Commands.add('completeAndSubmitAlternativeCurrencyForm', require('../../../../commands/insurance/complete-and-submit-alternative-currency-form'));

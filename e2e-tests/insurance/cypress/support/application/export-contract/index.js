Cypress.Commands.add('completeAboutGoodsOrServicesForm', require('../../../../../commands/insurance/complete-about-goods-or-services-form'));
Cypress.Commands.add('completeHowWasTheContractAwardedForm', require('../../../../../commands/insurance/complete-how-was-the-contract-awarded-form'));
Cypress.Commands.add(
  'completeAndSubmitHowWasTheContractAwardedForm',
  require('../../../../../commands/insurance/complete-and-submit-how-was-the-contract-awarded-form'),
);
Cypress.Commands.add(
  'completeAndSubmitAboutGoodsOrServicesForm',
  require('../../../../../commands/insurance/complete-and-submit-about-goods-or-services-form'),
);
Cypress.Commands.add('completeHowYouWillGetPaidForm', require('../../../../../commands/insurance/complete-how-you-will-get-paid-form'));
Cypress.Commands.add('completeAndSubmitHowYouWillGetPaidForm', require('../../../../../commands/insurance/complete-and-submit-how-you-will-get-paid-form'));
Cypress.Commands.add('completePrivateMarketForm', require('../../../../../commands/insurance/complete-private-market-form'));
Cypress.Commands.add('completeAndSubmitPrivateMarketForm', require('../../../../../commands/insurance/complete-and-submit-private-market-form'));
Cypress.Commands.add('completeDeclinedByPrivateMarketForm', require('../../../../../commands/insurance/complete-declined-by-private-market-form'));
Cypress.Commands.add(
  'completeAndSubmitDeclinedByPrivateMarketForm',
  require('../../../../../commands/insurance/complete-and-submit-declined-by-private-market-form'),
);
Cypress.Commands.add('completeAgentForm', require('../../../../../commands/insurance/complete-agent-form'));
Cypress.Commands.add('completeAgentDetailsForm', require('../../../../../commands/insurance/complete-agent-details-form'));
Cypress.Commands.add('completeAndSubmitAgentForm', require('../../../../../commands/insurance/complete-and-submit-agent-form'));
Cypress.Commands.add('completeAndSubmitAgentDetailsForm', require('../../../../../commands/insurance/complete-and-submit-agent-details-form'));
Cypress.Commands.add('completeAgentServiceForm', require('../../../../../commands/insurance/complete-agent-service-form'));
Cypress.Commands.add('completeAndSubmitAgentServiceForm', require('../../../../../commands/insurance/complete-and-submit-agent-service-form'));
Cypress.Commands.add('completeAgentChargesForm', require('../../../../../commands/insurance/complete-agent-charges-form'));
Cypress.Commands.add('completeAndSubmitAgentChargesForm', require('../../../../../commands/insurance/complete-and-submit-agent-charges-form'));

Cypress.Commands.add(
  'completeAndSubmitExportContractForms',
  require('../../../../../commands/insurance/export-contract/complete-and-submit-export-contract-forms'),
);

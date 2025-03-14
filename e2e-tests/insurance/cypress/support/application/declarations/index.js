Cypress.Commands.add(
  'completeAndSubmitDeclarationConfidentiality',
  require('../../../../../commands/insurance/declarations/complete-and-submit-confidentiality-form'),
);
Cypress.Commands.add(
  'completeAndSubmitDeclarationAntiBribery',
  require('../../../../../commands/insurance/declarations/complete-and-submit-anti-bribery-form'),
);
Cypress.Commands.add(
  'completeAndSubmitDeclarationAntiBriberyCodeOfConduct',
  require('../../../../../commands/insurance/declarations/complete-and-submit-anti-bribery-code-of-conduct-form'),
);
Cypress.Commands.add(
  'completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct',
  require('../../../../../commands/insurance/declarations/complete-and-submit-anti-bribery-exporting-with-code-of-conduct-form'),
);

Cypress.Commands.add('completeModernSlaveryForm', require('../../../../../commands/insurance/declarations/complete-modern-slavery-form'));
Cypress.Commands.add('completeAndSubmitModernSlaveryForm', require('../../../../../commands/insurance/declarations/complete-and-submit-modern-slavery-form'));

Cypress.Commands.add(
  'completeModernSlaveryFormConditionalFields',
  require('../../../../../commands/insurance/declarations/complete-modern-slavery-form-conditional-fields'),
);

Cypress.Commands.add(
  'completeAndSubmitModernSlaveryFormConditionalFields',
  require('../../../../../commands/insurance/declarations/complete-and-submit-modern-slavery-form-conditional-fields'),
);

Cypress.Commands.add(
  'completeAndSubmitDeclarationConfirmationAndAcknowledgements',
  require('../../../../../commands/insurance/declarations/complete-and-submit-confirmation-and-acknowledgements-form'),
);
Cypress.Commands.add('completeAndSubmitDeclarations', require('../../../../../commands/insurance/complete-declarations'));

Cypress.Commands.add('completeAndSubmitDeclarationsForms', require('../../../../../commands/insurance/declarations/complete-and-submit-declarations-forms'));

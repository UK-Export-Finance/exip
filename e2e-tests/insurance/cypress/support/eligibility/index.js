import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeCompaniesHouseNumberForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeUkGoodsAndServicesForm,
  completeEligibleToApplyOnlineForm,
  completeAccountToApplyOnlineForm,
} from '../../../../commands/insurance/eligibility/forms';

Cypress.Commands.add('completeStartForm', completeStartForm);
Cypress.Commands.add('completeCheckIfEligibleForm', completeCheckIfEligibleForm);
Cypress.Commands.add('completeExporterLocationForm', completeExporterLocationForm);
Cypress.Commands.add('completeCompaniesHouseNumberForm', completeCompaniesHouseNumberForm);
Cypress.Commands.add('completeInsuredAmountForm', completeInsuredAmountForm);
Cypress.Commands.add('completeInsuredPeriodForm', completeInsuredPeriodForm);
Cypress.Commands.add('completeUkGoodsAndServicesForm', completeUkGoodsAndServicesForm);
Cypress.Commands.add('completeEligibleToApplyOnlineForm', completeEligibleToApplyOnlineForm);
Cypress.Commands.add('completeAccountToApplyOnlineForm', completeAccountToApplyOnlineForm);

Cypress.Commands.add('submitInsuranceEligibilityAnswersFromExporterLocationHappyPath', require('../../../../commands/insurance/eligibility/submit-answers-from-exporter-location-happy-path'));
Cypress.Commands.add('submitEligibilityAndStartAccountCreation', require('../../../../commands/insurance/submit-eligibility-and-start-account-creation'));
Cypress.Commands.add('submitEligibilityAndStartAccountSignIn', require('../../../../commands/insurance/submit-eligibility-and-start-account-sign-in'));

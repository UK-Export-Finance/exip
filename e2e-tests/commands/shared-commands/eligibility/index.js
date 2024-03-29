import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeCompaniesHouseNumberForm,
  completeAndSubmitTotalValueInsuredForm,
  completeCoverPeriodForm,
  completeUkGoodsAndServicesForm,
  completeEndBuyerForm,
  submitCheckYourAnswers,
  completeEligibleToApplyOnlineForm,
  completeAccountToApplyOnlineForm,
  completeCompanyDetailsForm,
} from '../../insurance/eligibility/forms';
import completeAndSubmitCompaniesHouseSearchForm from '../../insurance/complete-and-submit-companies-house-search-form';

Cypress.Commands.add('completeStartForm', completeStartForm);
Cypress.Commands.add('completeCheckIfEligibleForm', completeCheckIfEligibleForm);
Cypress.Commands.add('completeExporterLocationForm', completeExporterLocationForm);
Cypress.Commands.add('completeCompaniesHouseNumberForm', completeCompaniesHouseNumberForm);
Cypress.Commands.add('completeAndSubmitCompaniesHouseSearchForm', completeAndSubmitCompaniesHouseSearchForm);
Cypress.Commands.add('completeEligibilityCompanyDetailsForm', completeCompanyDetailsForm);
Cypress.Commands.add('completeAndSubmitTotalValueInsuredForm', completeAndSubmitTotalValueInsuredForm);
Cypress.Commands.add('completeCoverPeriodForm', completeCoverPeriodForm);
Cypress.Commands.add('completeUkGoodsAndServicesForm', completeUkGoodsAndServicesForm);
Cypress.Commands.add('completeEndBuyerForm', completeEndBuyerForm);
Cypress.Commands.add('submitCheckYourAnswers', submitCheckYourAnswers);
Cypress.Commands.add('completeEligibleToApplyOnlineForm', completeEligibleToApplyOnlineForm);
Cypress.Commands.add('completeAccountToApplyOnlineForm', completeAccountToApplyOnlineForm);

Cypress.Commands.add('submitInsuranceEligibilityAnswersFromExporterLocationHappyPath', require('../../insurance/eligibility/submit-answers-from-exporter-location-happy-path'));

import { submitButton } from '../../e2e/pages/shared';
import partials from '../../e2e/partials';
import { FIELD_VALUES } from '../../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

// runs through the full prepare your application journey for multiple policy type
export default () => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
  cy.completeAndSubmitMultipleContractPolicyForm();
  cy.completeAndSubmitAboutGoodsOrServicesForm();

  submitButton().click();

  cy.completeAndSubmitCompanyDetails();
  cy.completeAndSubmitYourContact();
  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitBrokerForm();

  submitButton().click();

  cy.completeAndSubmitCompanyOrOrganisationForm();
  cy.completeAndSubmitWorkingWithBuyerForm();

  submitButton().click();
};

import { submitButton } from '../../e2e/pages/shared';
import partials from '../../e2e/partials';
import { FIELD_VALUES } from '../../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

export default () => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
  cy.completeAndSubmitSingleContractPolicyForm();
  cy.completeAndSubmitAboutGoodsOrServicesForm();

  submitButton().click();

  cy.completeAndSubmitCompanyDetails();
  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitBrokerForm();

  submitButton().click();

  cy.completeAndSubmitCompanyOrOrganisationForm();
  cy.completeAndSubmitWorkingWithBuyerForm();

  submitButton().click();
};

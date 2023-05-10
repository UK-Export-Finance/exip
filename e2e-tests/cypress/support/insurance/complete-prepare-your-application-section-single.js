import { submitButton } from '../../e2e/pages/shared';
import partials from '../../e2e/partials';
import { FIELD_VALUES } from '../../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

/**
 * completePrepareApplicationSinglePolicyType
 * Runs through the full prepare your application journey for a single policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 */
export default ({ exporterHasTradedWithBuyer }) => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
  cy.completeAndSubmitSingleContractPolicyForm();
  cy.completeAndSubmitAboutGoodsOrServicesForm();

  submitButton().click();
\
  cy.completeAndSubmitCompanyDetails();
  cy.completeAndSubmitYourContact();
  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitBrokerForm();

  submitButton().click();

  cy.completeAndSubmitCompanyOrOrganisationForm();
  cy.completeAndSubmitWorkingWithBuyerForm({ exporterHasTradedWithBuyer });

  submitButton().click();
};

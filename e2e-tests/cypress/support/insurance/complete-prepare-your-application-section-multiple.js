import { submitButton } from '../../e2e/pages/shared';
import partials from '../../e2e/partials';
import { FIELD_VALUES } from '../../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - useDifferentContactEmail: Should submit a different email address in the "exporter contact" details form.
 * - policyAndExportsMaximumValue: should submit an application with the maximum value of 500000
 */
const completePrepareApplicationMultiplePolicyType = ({ useDifferentContactEmail, policyAndExportsMaximumValue }) => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
  cy.completeAndSubmitMultipleContractPolicyForm({ policyAndExportsMaximumValue });
  cy.completeAndSubmitAboutGoodsOrServicesForm();

  submitButton().click();

  cy.completeAndSubmitCompanyDetails();
  cy.completeAndSubmitYourContact({ useDifferentContactEmail });
  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitBrokerForm({});

  submitButton().click();

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitWorkingWithBuyerForm({});

  submitButton().click();
};

export default completePrepareApplicationMultiplePolicyType;

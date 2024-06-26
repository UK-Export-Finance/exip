import { submitButton } from '../../pages/shared';
import partials from '../../partials';
import { FIELD_VALUES } from '../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - referenceNumber: Application reference number
 */
const completePrepareApplicationMultiplePolicyType = ({
  usingBroker,
  policyMaximumValue = false,
  differentPolicyContact,
  referenceNumber,
}) => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
  cy.completeAndSubmitMultipleContractPolicyForm({ policyMaximumValue });
  cy.completeAndSubmitAboutGoodsOrServicesForm();
  cy.completeAndSubmitNameOnPolicyForm({ sameName: !differentPolicyContact });

  if (differentPolicyContact) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  submitButton().click();

  cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
  cy.completeAndSubmitCompanyDetails();
  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitBrokerForm({ usingBroker });

  submitButton().click();

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitWorkingWithBuyerForm({});

  submitButton().click();
};

export default completePrepareApplicationMultiplePolicyType;

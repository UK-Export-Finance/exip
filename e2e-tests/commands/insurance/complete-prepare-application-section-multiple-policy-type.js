import { submitButton } from '../../pages/shared';
import partials from '../../partials';
import { FIELD_VALUES } from '../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyAndExportsMaximumValue: should submit an application with the maximum value of 500000
 * - referenceNumber: Application reference number
 */
const completePrepareApplicationMultiplePolicyType = ({
  usingBroker,
  policyAndExportsMaximumValue = false,
  referenceNumber,
}) => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
  cy.completeAndSubmitMultipleContractPolicyForm({ policyAndExportsMaximumValue });
  cy.completeAndSubmitAboutGoodsOrServicesForm();
  cy.completeAndSubmitNameOnPolicyForm({});

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

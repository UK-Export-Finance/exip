import { submitButton } from '../../pages/shared';
import partials from '../../partials';
import { FIELD_VALUES } from '../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

/**
 * completePrepareYourApplicationSectionSingle
 * Runs through the full prepare your application journey for a single policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyAndExportsMaximumValue: Should submit an application with the maximum value of 500000
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - referenceNumber: Application reference number
 */
const completePrepareYourApplicationSectionSingle = ({
  exporterHasTradedWithBuyer,
  usingBroker,
  policyAndExportsMaximumValue = false,
  differentPolicyContact,
  referenceNumber,
}) => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
  cy.completeAndSubmitSingleContractPolicyForm({ policyAndExportsMaximumValue });
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
  cy.completeAndSubmitWorkingWithBuyerForm({ exporterHasTradedWithBuyer });

  submitButton().click();
};

export default completePrepareYourApplicationSectionSingle;

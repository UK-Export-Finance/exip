import { submitButton, startNowLink } from '../../pages/shared';
import { FIELD_VALUES } from '../../constants';

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 */
const completePrepareApplicationMultiplePolicyType = ({
  differentTradingAddress = false,
  usingBroker,
  policyMaximumValue = false,
  differentPolicyContact,
}) => {
  cy.startInsurancePolicySection();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
  cy.completeAndSubmitMultipleContractPolicyForm({ policyMaximumValue });
  cy.completeAndSubmitNameOnPolicyForm({ sameName: !differentPolicyContact });

  if (differentPolicyContact) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  cy.completeAndSubmitBrokerForm({ usingBroker });

  // submit "policy and exports - check your answers" form
  submitButton().click();

  // start "export contract" section
  startNowLink().click();

  cy.completeAndSubmitAboutGoodsOrServicesForm({});

  // submit "export contract - check your answers" form
  submitButton().click();

  cy.startYourBusinessSection();

  cy.completeAndSubmitCompanyDetails({ differentTradingAddress });

  if (differentTradingAddress) {
    cy.completeAndSubmitAlternativeTradingAddressForm();
  }

  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitCreditControlForm({});

  // submit "your business - check your answers" form
  submitButton().click();

  // start "your buyer" section
  startNowLink().click();

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionToTheBuyerForm({});
  cy.completeAndSubmitWorkingWithBuyerForm({});

  // submit "your buyer - check your answers" forM
  submitButton().click();
};

export default completePrepareApplicationMultiplePolicyType;

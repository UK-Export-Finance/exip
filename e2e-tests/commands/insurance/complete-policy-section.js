import { FIELD_VALUES } from '../../constants';

const { SINGLE } = FIELD_VALUES.POLICY_TYPE;

/**
 * completePolicySection
 * completes policy section
 * handles policyType and if sameName on policy
 * @param {String} policyType - if single or multiple policy - defaults to single
 * @param {Boolean} sameName - if sameName on policy - defaults to true
 * @param {Boolean} usingBroker - if usingBroker on policy - defaults to false
 */
const completePolicySection = ({ policyType = SINGLE, sameName = true, usingBroker = false }) => {
  cy.startInsurancePolicySection();

  cy.completeAndSubmitPolicyTypeForm(policyType);

  if (policyType === SINGLE) {
    cy.completeAndSubmitSingleContractPolicyForm({});
  } else {
    cy.completeAndSubmitMultipleContractPolicyForm({});
  }

  cy.completeAndSubmitAboutGoodsOrServicesForm({});

  cy.completeAndSubmitNameOnPolicyForm({ sameName });

  if (!sameName) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  cy.completeAndSubmitBrokerForm({ usingBroker });
};

export default completePolicySection;

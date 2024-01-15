import { FIELD_VALUES } from '../../constants';

const { SINGLE } = FIELD_VALUES.POLICY_TYPE;

/**
 * completePolicySection
 * Complete the "policy" section
 * @param {Boolean} viaTaskList: Start the "policy" section from the task list.
 * @param {String} policyType: If single or multiple policy - defaults to single
 * @param {Boolean} policyMaximumValue: If the value should be the maximum amount
 * @param {Boolean} sameName: If name on policy is the same as the signed in user - defaults to true
 * @param {Boolean} needPreCreditPeriod: If the user needs a pre-credit period - defaults to false
 * @param {Boolean} usingBroker: If "using broker" on  - defaults to false
 * @param {Boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 */
const completePolicySection = ({
  viaTaskList,
  policyType = SINGLE,
  policyMaximumValue = false,
  sameName = true,
  needPreCreditPeriod = false,
  usingBroker = false,
  submitCheckYourAnswers = false,
}) => {
  cy.startInsurancePolicySection({ viaTaskList });

  cy.completeAndSubmitPolicyTypeForm(policyType);

  if (policyType === SINGLE) {
    cy.completeAndSubmitSingleContractPolicyForm();

    cy.completeAndSubmitTotalContractValueForm({ policyMaximumValue });
  } else {
    cy.completeAndSubmitMultipleContractPolicyForm();

    cy.completeAndSubmitExportValueForm({ policyType });
  }

  cy.completeAndSubmitNameOnPolicyForm({ sameName });

  if (!sameName) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod });

  cy.completeAndSubmitBrokerForm({ usingBroker });

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completePolicySection;

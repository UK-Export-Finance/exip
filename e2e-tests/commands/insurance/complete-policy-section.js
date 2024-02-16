import { APPLICATION } from '../../constants';

const { POLICY_TYPE } = APPLICATION;;

/**
 * completePolicySection
 * Complete the "policy" section
 * @param {Boolean} viaTaskList: Start the "policy" section from the task list.
 * @param {String} policyType: If single or multiple policy - defaults to single
 * @param {Boolean} policyValueOverMvpMaximum: If the value should be over the MVP maximum amount
 * @param {Boolean} sameName: If name on policy is the same as the signed in user - defaults to true
 * @param {Boolean} needPreCreditPeriod: If the user needs a pre-credit period - defaults to false
 * @param {Boolean} usingBroker: If "using broker" on  - defaults to false
 * @param {Boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 */
const completePolicySection = ({
  viaTaskList,
  policyType = POLICY_TYPE.SINGLE,
  policyValueOverMvpMaximum = false,
  sameName = true,
  needPreCreditPeriod = false,
  usingBroker = false,
  submitCheckYourAnswers = false,
}) => {
  cy.startInsurancePolicySection({ viaTaskList });

  cy.completeAndSubmitPolicyTypeForm({ policyType });

  if (policyType === POLICY_TYPE.SINGLE) {
    cy.completeAndSubmitSingleContractPolicyForm({});

    cy.completeAndSubmitTotalContractValueForm({ policyValueOverMvpMaximum });
  } else {
    cy.completeAndSubmitMultipleContractPolicyForm({});

    cy.completeAndSubmitExportValueForm({ policyType });
  }

  cy.completeAndSubmitNameOnPolicyForm({ sameName });

  if (!sameName) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod });

  cy.completeAndSubmitAnotherCompanyForm({});

  cy.completeAndSubmitBrokerForm({ usingBroker });

  if (usingBroker) {
    cy.completeAndSubmitBrokerDetailsForm({});

    // submit the "confirm broker address" form
    cy.clickSubmitButton();
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completePolicySection;

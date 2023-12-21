import { FIELD_VALUES } from '../../constants';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - submitCheckYourAnswers: Should click each section's "check your answers" submit button
 */
const completePrepareApplicationMultiplePolicyType = ({
  differentTradingAddress = false,
  exporterHasTradedWithBuyer = false,
  differentPolicyContact = false,
  policyMaximumValue = false,
  usingBroker = false,
  submitCheckYourAnswers = true,
}) => {
  cy.completeBusinessSection({ differentTradingAddress, submitCheckYourAnswers });

  cy.completeBuyerSection({
    viaTaskList: false,
    exporterHasTradedWithBuyer,
    submitCheckYourAnswers,
  });

  cy.completePolicySection({
    policyType: POLICY_TYPE.MULTIPLE,
    sameName: !differentPolicyContact,
    policyMaximumValue,
    submitCheckYourAnswers,
    usingBroker,
  });

  cy.completeExportContractSection({ viaTaskList: false, submitCheckYourAnswers });
};

export default completePrepareApplicationMultiplePolicyType;

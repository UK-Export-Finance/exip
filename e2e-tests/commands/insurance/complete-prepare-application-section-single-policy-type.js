import { FIELD_VALUES } from '../../constants';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * completePrepareYourApplicationSectionSingle
 * Runs through the full prepare your application journey for a single policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyMaximumValue: Should submit an application with the maximum value of 500000
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - submitCheckYourAnswers: Should click each section's "check your answers" submit button
 */
const completePrepareApplicationSinglePolicyType = ({
  differentTradingAddress = false,
  exporterHasTradedWithBuyer,
  usingBroker,
  policyMaximumValue = false,
  differentPolicyContact,
  submitCheckYourAnswers = true,
}) => {
  cy.completeBusinessSection({ differentTradingAddress, submitCheckYourAnswers });

  cy.completeBuyerSection({
    viaTaskList: false,
    exporterHasTradedWithBuyer,
    submitCheckYourAnswers,
  });

  cy.completePolicySection({
    policyType: POLICY_TYPE.SINGLE,
    sameName: !differentPolicyContact,
    policyMaximumValue,
    submitCheckYourAnswers,
    usingBroker,
  });

  cy.completeExportContractSection({ viaTaskList: false, submitCheckYourAnswers });
};

export default completePrepareApplicationSinglePolicyType;

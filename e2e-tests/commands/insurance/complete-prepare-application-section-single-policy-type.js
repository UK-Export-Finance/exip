import { FIELD_VALUES } from '../../constants';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * completePrepareYourApplicationSectionSingle
 * Runs through the full prepare your application journey for a single policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form. Defaults to false.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - needPreCreditPeriod: If the user needs a pre-credit period - defaults to false
 * - submitCheckYourAnswers: Should click each section's "check your answers" submit button
 */
const completePrepareApplicationSinglePolicyType = ({
  differentTradingAddress = false,
  exporterHasTradedWithBuyer,
  usingBroker,
  policyValueOverMvpMaximum = false,
  differentPolicyContact,
  needPreCreditPeriod = false,
  submitCheckYourAnswers = true,
}) => {
  cy.completeBusinessSection({ differentTradingAddress, submitCheckYourAnswers });

  cy.completeBuyerSection({
    exporterHasTradedWithBuyer,
    submitCheckYourAnswers,
  });

  cy.completePolicySection({
    policyType: POLICY_TYPE.SINGLE,
    sameName: !differentPolicyContact,
    policyValueOverMvpMaximum,
    submitCheckYourAnswers,
    usingBroker,
    needPreCreditPeriod,
  });

  cy.completeExportContractSection({ viaTaskList: false, submitCheckYourAnswers });
};

export default completePrepareApplicationSinglePolicyType;

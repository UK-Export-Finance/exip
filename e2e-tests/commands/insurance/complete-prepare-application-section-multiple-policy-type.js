import { FIELD_VALUES } from '../../constants';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyValueOverMvpMaximum: should submit an application with the value over the MVP maximum amount
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - needPreCreditPeriod: If the user needs a pre-credit period - defaults to false
 * - submitCheckYourAnswers: Should click each section's "check your answers" submit button
 */
const completePrepareApplicationMultiplePolicyType = ({
  differentTradingAddress = false,
  exporterHasTradedWithBuyer = false,
  usingBroker = false,
  policyValueOverMvpMaximum = false,
  differentPolicyContact = false,
  needPreCreditPeriod = false,
  submitCheckYourAnswers = true,
}) => {
  cy.completeBusinessSection({ differentTradingAddress, submitCheckYourAnswers });

  cy.completeBuyerSection({
    exporterHasTradedWithBuyer,
    submitCheckYourAnswers,
  });

  cy.completePolicySection({
    policyType: POLICY_TYPE.MULTIPLE,
    sameName: !differentPolicyContact,
    policyValueOverMvpMaximum,
    submitCheckYourAnswers,
    usingBroker,
    needPreCreditPeriod,
  });

  cy.completeExportContractSection({ viaTaskList: false, submitCheckYourAnswers });
};

export default completePrepareApplicationMultiplePolicyType;

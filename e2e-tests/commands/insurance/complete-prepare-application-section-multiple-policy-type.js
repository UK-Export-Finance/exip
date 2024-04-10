import { APPLICATION } from '../../constants';

const { POLICY_TYPE } = APPLICATION;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * @param {Boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form. Defaults to false.
 * @param {Boolean} exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount.
 * @param {Boolean} differentPolicyContact: Should submit an application with a different policy contact to the owner.
 * @param {Boolean} needPreCreditPeriod: If the user needs a pre-credit period - defaults to false.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {Boolean} isUsingAgent: Should submit "yes" to "using an agent" form.
 * @param {Boolean} submitCheckYourAnswers: Should click each section's "check your answers" submit button.
 */
const completePrepareApplicationMultiplePolicyType = ({
  differentTradingAddress = false,
  exporterHasTradedWithBuyer = false,
  fullyPopulatedBuyerTradingHistory = false,
  usingBroker = false,
  policyValueOverMvpMaximum = false,
  differentPolicyContact = false,
  needPreCreditPeriod = false,
  totalContractValueOverThreshold = false,
  attemptedPrivateMarketCover = false,
  isUsingAgent = false,
  submitCheckYourAnswers = true,
}) => {
  cy.completeBusinessSection({ differentTradingAddress, submitCheckYourAnswers });

  cy.completeBuyerSection({
    exporterHasTradedWithBuyer,
    fullyPopulatedBuyerTradingHistory,
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

  cy.completeExportContractSection({
    viaTaskList: false,
    totalContractValueOverThreshold,
    attemptedPrivateMarketCover,
    isUsingAgent,
    submitCheckYourAnswers,
  });
};

export default completePrepareApplicationMultiplePolicyType;

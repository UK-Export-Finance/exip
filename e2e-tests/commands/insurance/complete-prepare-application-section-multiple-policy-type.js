import { APPLICATION } from '../../constants';

const { POLICY_TYPE } = APPLICATION;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full prepare your application journey for multiple policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * @param {Boolean} alternativeBuyerCurrency: Should submit an "alternative currency" in the buyer section. Defaults to false.
 * @param {Boolean} differentTradingName: Should submit "yes" to "have a different trading name" in the "company details" form. Defaults to false.
 * @param {Boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form. Defaults to false.
 * @param {Boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form. Defaults to false.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio.
 * @param {Boolean} exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} buyerOutstandingPayments: Exporter has outstanding payments with the buyer
 * @param {Boolean} buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time
 * @param {Boolean} fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {Boolean} hasHadCreditInsuranceCover: Submit "yes" to if export "has held credit insurance cover on the buyer in the past".
 * @param {Boolean} exporterHasBuyerFinancialAccounts: Should submit "yes" to the "have buyer financial accounts" form.
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * @param {Boolean} otherCompanyInvolved: If "another company to be insured" is on  - defaults to false
 * @param {Boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to "no".
 * @param {Boolean} lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details". Defaults to false.
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount.
 * @param {Boolean} differentPolicyContact: Should submit an application with a different policy contact to the owner.
 * @param {Boolean} needPreCreditPeriod: If the user needs a pre-credit period - defaults to false.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {Boolean} isUsingAgent: Should submit "yes" to "using an agent" form.
 * @param {Boolean} agentIsCharging: Should submit "yes" to "agent is charging" in the "agent details" form.
 * @param {Boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum"
 * @param {Boolean} agentChargeMethodPercentage: Agent charge method is "percentage"
 * @param {Boolean} submitCheckYourAnswers: Should click each section's "check your answers" submit button.
 */
const completePrepareApplicationMultiplePolicyType = ({
  alternativeBuyerCurrency = false,
  differentTradingName = false,
  differentTradingAddress = false,
  hasCreditControlProcess = false,
  hasConnectionToBuyer = false,
  exporterHasTradedWithBuyer = false,
  buyerOutstandingPayments = false,
  buyerFailedToPayOnTime = false,
  fullyPopulatedBuyerTradingHistory = false,
  hasHadCreditInsuranceCover = false,
  exporterHasBuyerFinancialAccounts = false,
  usingBroker = false,
  otherCompanyInvolved = false,
  isAppointingLossPayee = false,
  lossPayeeIsLocatedInUK = false,
  policyValueOverMvpMaximum = false,
  differentPolicyContact = false,
  needPreCreditPeriod = false,
  totalContractValueOverThreshold = false,
  attemptedPrivateMarketCover = false,
  isUsingAgent = false,
  agentIsCharging = false,
  agentChargeMethodFixedSum = false,
  agentChargeMethodPercentage = false,
  submitCheckYourAnswers = true,
}) => {
  cy.completeBusinessSection({
    differentTradingName,
    differentTradingAddress,
    hasCreditControlProcess,
    submitCheckYourAnswers,
  });

  cy.completeBuyerSection({
    alternativeCurrency: alternativeBuyerCurrency,
    hasConnectionToBuyer,
    exporterHasTradedWithBuyer,
    outstandingPayments: buyerOutstandingPayments,
    failedToPay: buyerFailedToPayOnTime,
    fullyPopulatedBuyerTradingHistory,
    hasHadCreditInsuranceCover,
    exporterHasBuyerFinancialAccounts,
    totalContractValueOverThreshold,
    submitCheckYourAnswers,
  });

  cy.completePolicySection({
    policyType: POLICY_TYPE.MULTIPLE,
    sameName: !differentPolicyContact,
    policyValueOverMvpMaximum,
    submitCheckYourAnswers,
    usingBroker,
    otherCompanyInvolved,
    needPreCreditPeriod,
    isAppointingLossPayee,
    lossPayeeIsLocatedInUK,
  });

  cy.completeExportContractSection({
    totalContractValueOverThreshold,
    attemptedPrivateMarketCover,
    isUsingAgent,
    agentIsCharging,
    agentChargeMethodFixedSum,
    agentChargeMethodPercentage,
    submitCheckYourAnswers,
  });
};

export default completePrepareApplicationMultiplePolicyType;

import { APPLICATION } from '../../constants';

const { POLICY_TYPE } = APPLICATION;

/**
 * completePrepareApplicationMultiplePolicyType
 * Runs through the full "prepare your application" section/journey for multiple contract policy
 * All params default to false, except for submitCheckYourAnswers.
 * @param {boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum".
 * @param {string} agentChargeFixedSumAmount: Agent charge fixed sum amount
 * @param {boolean} agentChargeMethodPercentage: Agent charge method is "percentage".
 * @param {boolean} agentIsCharging: Should submit "yes" to "agent is charging" in the "agent details" form.
 * @param {boolean} alternativeCurrencyBuyer: Should submit an "buyer - alternative currency"
 * @param {boolean} alternativeCurrencyExportContract: Select the "agent - alternative currency" option
 * @param {boolean} alternativeCurrencyTurnover: Select the "turnover - alternative currency" option
 * @param {boolean} alternativeCurrencyPolicy: Select the "policy - alternative currency" option
 * @param {boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {boolean} buyerOutstandingPayments: Exporter has outstanding payments with the buyer.
 * @param {boolean} buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time.
 * @param {boolean} contractAwardedCompetitiveBidding: "How was the contract awarded" method as COMPETITIVE_BIDDING
 * @param {boolean} contractAwardedDirectAward: "How was the contract awarded" method as DIRECT_AWARD
 * @param {boolean} contractAwardedNegotiatedContract: "How was the contract awarded" method as NEGOTIATED_CONTRACT
 * @param {boolean} contractAwardedOpenTender: "How was the contract awarded" method as OPEN_TENDER
 * @param {boolean} contractAwardedOtherMethod: "How was the contract awarded" method as OTHER
 * @param {string} maximumBuyerWillOwe: Maximum buyer will owe
 * @param {boolean} differentPolicyContact: Should submit an application with a different policy contact to the owner.
 * @param {boolean} differentTradingName: Should submit "yes" to "have a different trading name" in the "company details" form.
 * @param {boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form.
 * @param {boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio.
 * @param {boolean} exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {boolean} exporterHasBuyerFinancialAccounts: Should submit "yes" to the "have buyer financial accounts" form.
 * @param {boolean} finalDestinationKnown: Should submit "yes" to "Final destination known"
 * @param {boolean} fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {boolean} hasHadCreditInsuranceCoverWithBuyer: Submit "yes" to if export "has held credit insurance cover on the buyer in the past".
 * @param {boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee".
 * @param {boolean} isUsingAgent: Should submit "yes" to "using an agent" form.
 * @param {boolean} lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details".
 * @param {boolean} needPreCreditPeriod: If the user needs a pre-credit period.
 * @param {boolean} otherCompanyInvolved: If "another company to be insured" is on.
 * @param {boolean} policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount.
 * @param {boolean} submitCheckYourAnswers: Should click each section's "check your answers" submit button.
 * @param {boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {boolean} usingBroker: Should submit "yes" or "no" to "using a broker".
 * @param {boolean} brokerIsBasedInUk: Should submit "yes or "no" to "broker is based in the UK".
 * @param {string} brokerBuildingNumberOrName: Broker building name or number.
 * @param {string} brokerPostcode: Broker postcode.
 * @param {boolean} multipleBrokerAddressesAvailable: Multiple broker addresses are available from Ordnance Survey.
 * @param {boolean} provideBrokerAddressManually: Provide a broker address manually, instead of selecting a result from Ordnance Survey
 */
const completePrepareApplicationMultiplePolicyType = ({
  agentChargeMethodFixedSum = false,
  agentChargeFixedSumAmount,
  agentChargeMethodPercentage = false,
  agentIsCharging = false,
  alternativeCurrencyBuyer = false,
  alternativeCurrencyExportContract = false,
  alternativeCurrencyTurnover = false,
  alternativeCurrencyPolicy = false,
  attemptedPrivateMarketCover = false,
  buyerOutstandingPayments = false,
  buyerFailedToPayOnTime = false,
  contractAwardedCompetitiveBidding = false,
  contractAwardedDirectAward = false,
  contractAwardedNegotiatedContract = false,
  contractAwardedOpenTender = true,
  contractAwardedOtherMethod = false,
  maximumBuyerWillOwe,
  differentPolicyContact = false,
  differentTradingName = false,
  differentTradingAddress = false,
  exporterHasBuyerFinancialAccounts = false,
  exporterHasTradedWithBuyer = false,
  finalDestinationKnown = false,
  fullyPopulatedBuyerTradingHistory = false,
  hasCreditControlProcess = false,
  hasConnectionToBuyer = false,
  hasHadCreditInsuranceCoverWithBuyer = false,
  isAppointingLossPayee = false,
  isUsingAgent = false,
  lossPayeeIsLocatedInUK = false,
  needPreCreditPeriod = false,
  otherCompanyInvolved = false,
  policyValueOverMvpMaximum = false,
  totalContractValueOverThreshold = false,
  submitCheckYourAnswers = true,
  usingBroker = false,
  brokerIsBasedInUk = false,
  brokerBuildingNumberOrName,
  brokerPostcode,
  multipleBrokerAddressesAvailable,
  provideBrokerAddressManually,
}) => {
  cy.completeBusinessSection({
    differentTradingName,
    differentTradingAddress,
    hasCreditControlProcess,
    submitCheckYourAnswers,
    alternativeCurrencyTurnover,
  });

  cy.completeBuyerSection({
    alternativeCurrency: alternativeCurrencyBuyer,
    hasConnectionToBuyer,
    exporterHasTradedWithBuyer,
    outstandingPayments: buyerOutstandingPayments,
    failedToPay: buyerFailedToPayOnTime,
    fullyPopulatedBuyerTradingHistory,
    hasHadCreditInsuranceCoverWithBuyer,
    exporterHasBuyerFinancialAccounts,
    totalContractValueOverThreshold,
    submitCheckYourAnswers,
  });

  cy.completePolicySection({
    policyType: POLICY_TYPE.MULTIPLE,
    maximumBuyerWillOwe,
    sameName: !differentPolicyContact,
    policyValueOverMvpMaximum,
    submitCheckYourAnswers,
    usingBroker,
    brokerIsBasedInUk,
    brokerBuildingNumberOrName,
    brokerPostcode,
    multipleBrokerAddressesAvailable,
    provideBrokerAddressManually,
    otherCompanyInvolved,
    needPreCreditPeriod,
    isAppointingLossPayee,
    lossPayeeIsLocatedInUK,
    alternativeCurrency: alternativeCurrencyPolicy,
  });

  cy.completeExportContractSection({
    agentIsCharging,
    agentChargeMethodFixedSum,
    agentChargeFixedSumAmount,
    agentChargeMethodPercentage,
    alternativeCurrency: alternativeCurrencyExportContract,
    attemptedPrivateMarketCover,
    contractAwardedCompetitiveBidding,
    contractAwardedDirectAward,
    contractAwardedNegotiatedContract,
    contractAwardedOpenTender,
    contractAwardedOtherMethod,
    finalDestinationKnown,
    isUsingAgent,
    submitCheckYourAnswers,
    totalContractValueOverThreshold,
  });
};

export default completePrepareApplicationMultiplePolicyType;

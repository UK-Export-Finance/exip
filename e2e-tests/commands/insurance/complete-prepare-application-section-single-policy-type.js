import { FIELD_VALUES } from '../../constants';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * completePrepareYourApplicationSectionSingle
 * Runs through the full "prepare your application" section/journey for a single contract policy
 * All params default to false, except for submitCheckYourAnswers.
 * @param {Boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum".
 * @param {String} agentChargeFixedSumAmount: Agent charge fixed sum amount
 * @param {Boolean} agentChargeMethodPercentage: Agent charge method is "percentage".
 * @param {Boolean} agentIsCharging: Should submit "yes" to "agent is charging" in the "agent details" form.
 * @param {Boolean} alternativeCurrencyBuyer: Should submit an "buyer - alternative currency"
 * @param {Boolean} alternativeCurrencyExportContract: Select the "agent - alternative currency" option
 * @param {Boolean} alternativeCurrencyTurnover: Select the "turnover - alternative currency" option
 * @param {Boolean} alternativeCurrencyPolicy: Select the "policy - alternative currency" option
 * @param {Boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {Boolean} buyerOutstandingPayments: Exporter has outstanding payments with the buyer.
 * @param {Boolean} buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time.
 * @param {Boolean} contractAwardedCompetitiveBidding: "How was the contract awarded" method as COMPETITIVE_BIDDING
 * @param {Boolean} contractAwardedDirectAward: "How was the contract awarded" method as DIRECT_AWARD
 * @param {Boolean} contractAwardedNegotiatedContract: "How was the contract awarded" method as NEGOTIATED_CONTRACT
 * @param {Boolean} contractAwardedOpenTender: "How was the contract awarded" method as OPEN_TENDER
 * @param {Boolean} contractAwardedOtherMethod: "How was the contract awarded" method as OTHER
 * @param {Boolean} differentPolicyContact: Should submit an application with a different policy contact to the owner.
 * @param {Boolean} differentTradingName: Should submit "yes" to "have a different trading name" in the "company details" form.
 * @param {Boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {Boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio.
 * @param {Boolean} exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} exporterHasBuyerFinancialAccounts: Should submit "yes" to the "have buyer financial accounts" form.
 * @param {Boolean} finalDestinationKnown: Should submit "yes" to "Final destination known"
 * @param {Boolean} fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {Boolean} hasHadCreditInsuranceCoverWithBuyer: Submit "yes" to if export "has held credit insurance cover on the buyer in the past".
 * @param {Boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee".
 * @param {Boolean} isUsingAgent: Should submit "yes" to "using an agent" form.
 * @param {Boolean} lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details".
 * @param {Boolean} needPreCreditPeriod: If the user needs a pre-credit period.
 * @param {Boolean} otherCompanyInvolved: If "another company to be insured" is on.
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount.
 * @param {Boolean} submitCheckYourAnswers: Should click each section's "check your answers" submit button.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker".
 * @param {Boolean} brokerIsBasedInUk: Should submit "yes or "no" to "broker is based in the UK".
 * @param {String} brokerBuildingNumberOrName: Broker building name or number.
 * @param {String} brokerPostcode: Broker postcode.
 * @param {Boolean} multipleBrokerAddressesAvailable: Multiple broker addresses are available from Ordnance Survey.
 * @param {Boolean} provideBrokerAddressManually: Provide a broker address manually, instead of selecting a result from Ordnance Survey
 */
const completePrepareApplicationSinglePolicyType = ({
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
    policyType: POLICY_TYPE.SINGLE,
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
    contractAwardedOpenTender,
    contractAwardedCompetitiveBidding,
    contractAwardedDirectAward,
    contractAwardedNegotiatedContract,
    contractAwardedOtherMethod,
    finalDestinationKnown,
    isUsingAgent,
    submitCheckYourAnswers,
    totalContractValueOverThreshold,
  });
};

export default completePrepareApplicationSinglePolicyType;

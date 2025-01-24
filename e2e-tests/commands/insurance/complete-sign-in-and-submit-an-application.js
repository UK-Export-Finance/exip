import { APPLICATION } from '../../constants';
import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';

/**
 * completeSignInAndSubmitAnApplication
 * 1) Complete "sign in and go to application"
 * 2) Complete and submit all "prepare your application" forms/sections
 * 3) Complete and submit all declarations forms
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * All params default to false.
 * @param {Boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum".
 * @param {Boolean} agentChargeMethodPercentage: Agent charge method is "percentage".
 * @param {Boolean} agentIsCharging: Should submit "yes" to "agent is charging" in the "agent details" form.
 * @param {Boolean} alternativeCurrencyBuyer: Should submit an "buyer - alternative currency".
 * @param {Boolean} alternativeCurrencyExportContract: Select the "export contract - alternative currency" option
 * @param {Boolean} alternativeCurrencyTurnover: Select the "turnover - alternative currency" option
 * @param {Boolean} alternativeCurrencyPolicy: Select the "policy - alternative currency" option
 * @param {Boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {Boolean} buyerOutstandingPayments: Exporter has outstanding payments with the buyer.
 * @param {Boolean} buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time.
 * @param {String} companyNumber: Company number/Companies house number
 * @param {Boolean} contractAwardedOtherMethod: "How was the contract awarded" method as "other"
 * @param {String} maximumBuyerWillOwe: Maximum buyer will owe
 * @param {Boolean} createApplicationViaApi: Flag whether to create the application via API instead of going through the eligibility journey.
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
 * @param {Boolean} otherCompanyInvolved: Should submit "yes" to "another company to be insured".
 * @param {Boolean} policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount.
 * @param {Boolean} submitCheckYourAnswers: Should click each section's "check your answers" submit button.
 * @param {Boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker".
 * @param {Boolean} brokerIsBasedInUk: Should submit "yes or "no" to "broker is based in the UK".
 * @param {String} brokerBuildingNumberOrName: Broker building name or number.
 * @param {String} brokerPostcode: Broker postcode.
 * @param {Boolean} multipleBrokerAddressesAvailable: Multiple broker addresses are available from Ordnance Survey.
 * @param {Boolean} provideBrokerAddressManually: Provide a broker address manually, instead of selecting a result from Ordnance Survey
 * @return {String} Application reference number
 */
const completeSignInAndSubmitAnApplication = ({
  alternativeCurrencyBuyer = false,
  alternativeCurrencyExportContract = false,
  alternativeCurrencyTurnover = false,
  alternativeCurrencyPolicy = false,
  agentIsCharging = false,
  agentChargeMethodFixedSum = false,
  agentChargeMethodPercentage = false,
  attemptedPrivateMarketCover = false,
  buyerOutstandingPayments = false,
  buyerFailedToPayOnTime = false,
  createApplicationViaApi,
  companyNumber,
  contractAwardedOtherMethod = false,
  maximumBuyerWillOwe,
  differentPolicyContact = false,
  differentTradingName = false,
  differentTradingAddress = false,
  exporterHasBuyerFinancialAccounts = false,
  exporterHasTradedWithBuyer = false,
  exportingWithCodeOfConduct = false,
  finalDestinationKnown = false,
  fullyPopulatedBuyerTradingHistory = false,
  hasAntiBriberyCodeOfConduct = false,
  hasConnectionToBuyer = false,
  hasHadCreditInsuranceCoverWithBuyer = false,
  isAppointingLossPayee = false,
  isUsingAgent = false,
  lossPayeeIsLocatedInUK = false,
  needPreCreditPeriod = false,
  otherCompanyInvolved = false,
  policyType = APPLICATION.POLICY_TYPE.SINGLE,
  policyValueOverMvpMaximum = false,
  totalContractValueOverThreshold = false,
  usingBroker = false,
  brokerIsBasedInUk = false,
  brokerBuildingNumberOrName,
  brokerPostcode,
  multipleBrokerAddressesAvailable,
  provideBrokerAddressManually,
}) => {
  completeSignInAndGoToApplication({
    companyNumber,
    createApplicationViaApi,
    totalContractValueOverThreshold,
  }).then(({ referenceNumber }) => {
    if (policyType === APPLICATION.POLICY_TYPE.MULTIPLE) {
      cy.completePrepareApplicationMultiplePolicyType({
        agentChargeMethodFixedSum,
        agentChargeMethodPercentage,
        agentIsCharging,
        attemptedPrivateMarketCover,
        alternativeCurrencyBuyer,
        alternativeCurrencyExportContract,
        alternativeCurrencyTurnover,
        alternativeCurrencyPolicy,
        buyerOutstandingPayments,
        buyerFailedToPayOnTime,
        contractAwardedOtherMethod,
        maximumBuyerWillOwe,
        differentPolicyContact,
        differentTradingName,
        differentTradingAddress,
        exporterHasBuyerFinancialAccounts,
        exporterHasTradedWithBuyer,
        finalDestinationKnown,
        fullyPopulatedBuyerTradingHistory,
        hasConnectionToBuyer,
        hasHadCreditInsuranceCoverWithBuyer,
        isAppointingLossPayee,
        isUsingAgent,
        lossPayeeIsLocatedInUK,
        needPreCreditPeriod,
        otherCompanyInvolved,
        policyValueOverMvpMaximum,
        referenceNumber,
        totalContractValueOverThreshold,
        usingBroker,
        brokerIsBasedInUk,
        brokerBuildingNumberOrName,
        brokerPostcode,
        multipleBrokerAddressesAvailable,
        provideBrokerAddressManually,
      });
    } else {
      cy.completePrepareApplicationSinglePolicyType({
        agentChargeMethodFixedSum,
        agentChargeMethodPercentage,
        agentIsCharging,
        alternativeCurrencyBuyer,
        alternativeCurrencyExportContract,
        alternativeCurrencyTurnover,
        alternativeCurrencyPolicy,
        attemptedPrivateMarketCover,
        buyerFailedToPayOnTime,
        buyerOutstandingPayments,
        contractAwardedOtherMethod,
        differentPolicyContact,
        differentTradingName,
        differentTradingAddress,
        exporterHasBuyerFinancialAccounts,
        exporterHasTradedWithBuyer,
        finalDestinationKnown,
        fullyPopulatedBuyerTradingHistory,
        hasConnectionToBuyer,
        hasHadCreditInsuranceCoverWithBuyer,
        needPreCreditPeriod,
        isAppointingLossPayee,
        isUsingAgent,
        lossPayeeIsLocatedInUK,
        otherCompanyInvolved,
        policyValueOverMvpMaximum,
        referenceNumber,
        totalContractValueOverThreshold,
        usingBroker,
        brokerIsBasedInUk,
        brokerBuildingNumberOrName,
        brokerPostcode,
        multipleBrokerAddressesAvailable,
        provideBrokerAddressManually,
      });
    }
    cy.completeAndSubmitCheckYourAnswers();

    cy.completeAndSubmitDeclarations({ hasAntiBriberyCodeOfConduct, exportingWithCodeOfConduct });

    return cy.getReferenceNumber().then((refNumber) => refNumber);
  });
};

export default completeSignInAndSubmitAnApplication;

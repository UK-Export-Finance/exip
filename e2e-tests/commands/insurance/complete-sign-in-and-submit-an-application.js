import { APPLICATION } from '../../constants';
import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';

/**
 * completeSignInAndSubmitAnApplication
 * 1) Complete "sign in and go to application"
 * 2) Complete and submit all "prepare your application" forms/sections
 * 3) Complete and submit all declarations forms
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * All params default to false.
 * @param {boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum".
 * @param {boolean} agentChargeMethodPercentage: Agent charge method is "percentage".
 * @param {boolean} agentIsCharging: Should submit "yes" to "agent is charging" in the "agent details" form.
 * @param {boolean} alternativeCurrencyBuyer: Should submit an "buyer - alternative currency".
 * @param {boolean} alternativeCurrencyExportContract: Select the "export contract - alternative currency" option
 * @param {boolean} alternativeCurrencyTurnover: Select the "turnover - alternative currency" option
 * @param {boolean} alternativeCurrencyPolicy: Select the "policy - alternative currency" option
 * @param {boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {boolean} buyerOutstandingPayments: Exporter has outstanding payments with the buyer.
 * @param {boolean} buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time.
 * @param {string} companyNumber: Company number/Companies house number
 * @param {boolean} contractAwardedOtherMethod: "How was the contract awarded" method as "other"
 * @param {string} maximumBuyerWillOwe: Maximum buyer will owe
 * @param {boolean} createApplicationViaApi: Flag whether to create the application via API instead of going through the eligibility journey.
 * @param {boolean} differentPolicyContact: Should submit an application with a different policy contact to the owner.
 * @param {boolean} differentTradingName: Should submit "yes" to "have a different trading name" in the "company details" form.
 * @param {boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {boolean} hasCreditControlProcess: Flag whether to submit "yes" or "no" radio input in the "credit control" form.
 * @param {boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio.
 * @param {boolean} exporterHasBuyerFinancialAccounts: Should submit "yes" to the "have buyer financial accounts" form.
 * @param {boolean} exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {boolean} finalDestinationKnown: Should submit "yes" to "Final destination known"
 * @param {boolean} fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * @param {boolean} hasHadCreditInsuranceCoverWithBuyer: Submit "yes" to if export "has held credit insurance cover on the buyer in the past".
 * @param {boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee".
 * @param {boolean} isUsingAgent: Should submit "yes" to "using an agent" form.
 * @param {boolean} lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details".
 * @param {boolean} needPreCreditPeriod: If the user needs a pre-credit period.
 * @param {boolean} otherCompanyInvolved: Should submit "yes" to "another company to be insured".
 * @param {boolean} policyValueOverMvpMaximum: Should submit an application with the value over the MVP maximum amount.
 * @param {boolean} submitCheckYourAnswers: Should click each section's "check your answers" submit button.
 * @param {boolean} totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * @param {boolean} usingBroker: Should submit "yes" or "no" to "using a broker".
 * @param {boolean} brokerIsBasedInUk: Should submit "yes or "no" to "broker is based in the UK".
 * @param {string} brokerBuildingNumberOrName: Broker building name or number.
 * @param {string} brokerPostcode: Broker postcode.
 * @param {boolean} hasAntiBriberyCodeOfConduct: has "anti-bribery - code of conduct"
 * @param {boolean} exportingWithCodeOfConduct: will export with "anti-bribery - exporting with code of conduct"
 * @param {boolean} willAdhereToAllRequirements: "Declaration - Modern slavery - will adhere to all requirements" answer
 * @param {boolean} hasNoOffensesOrInvestigations: "Declaration - Modern slavery - has no offenses or investigations" answer
 * @param {boolean} isNotAwareOfExistingSlavery: "Declaration - Modern slavery - is not aware of existing slavery" answer
 * @param {string} awareOfExistingSlavery: "Declaration - modern slavery - aware of existing slavery" textarea answer
 * @param {string} cannotAdhereToAllRequirements: "Declaration - modern slavery - cannot adhere to all requirements" textarea answer
 * @param {string} offensesOrInvestigations: "Declaration - modern slavery - offenses or investigations" textarea answer
 * @return {string} Application reference number
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
  finalDestinationKnown = false,
  fullyPopulatedBuyerTradingHistory = false,
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
  hasAntiBriberyCodeOfConduct = false,
  exportingWithCodeOfConduct = false,
  willAdhereToAllRequirements,
  hasNoOffensesOrInvestigations,
  isNotAwareOfExistingSlavery,
  awareOfExistingSlavery,
  cannotAdhereToAllRequirements,
  offensesOrInvestigations,
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

    cy.completeAndSubmitDeclarations({
      hasAntiBriberyCodeOfConduct,
      exportingWithCodeOfConduct,
      willAdhereToAllRequirements,
      hasNoOffensesOrInvestigations,
      isNotAwareOfExistingSlavery,
      awareOfExistingSlavery,
      cannotAdhereToAllRequirements,
      offensesOrInvestigations,
    });

    return cy.getReferenceNumber().then((refNumber) => refNumber);
  });
};

export default completeSignInAndSubmitAnApplication;

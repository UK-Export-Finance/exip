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
 * @param {Boolean} alternativeBuyerCurrency: Should submit an "alternative currency" in the buyer section.
 * @param {Boolean} attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * @param {Boolean} buyerOutstandingPayments: Exporter has outstanding payments with the buyer.
 * @param {Boolean} buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time.
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
 * @param {Boolean} alternativeCurrencyTurnover: Select the "alternative currency" option
 * @param {Boolean} alternativeCurrencyPolicy: Select the "alternative currency" option
 * @return {String} Application reference number
 */
const completeSignInAndSubmitAnApplication = ({
  alternativeBuyerCurrency = false,
  agentIsCharging = false,
  agentChargeMethodFixedSum = false,
  agentChargeMethodPercentage = false,
  attemptedPrivateMarketCover = false,
  buyerOutstandingPayments = false,
  buyerFailedToPayOnTime = false,
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
  alternativeCurrencyTurnover = false,
  alternativeCurrencyPolicy = false,
}) => {
  completeSignInAndGoToApplication({ totalContractValueOverThreshold }).then(({ referenceNumber }) => {
    if (policyType === APPLICATION.POLICY_TYPE.MULTIPLE) {
      cy.completePrepareApplicationMultiplePolicyType({
        agentChargeMethodFixedSum,
        agentChargeMethodPercentage,
        agentIsCharging,
        attemptedPrivateMarketCover,
        alternativeBuyerCurrency,
        buyerOutstandingPayments,
        buyerFailedToPayOnTime,
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
        alternativeCurrencyTurnover,
        alternativeCurrencyPolicy,
      });
    } else {
      cy.completePrepareApplicationSinglePolicyType({
        agentChargeMethodFixedSum,
        agentChargeMethodPercentage,
        agentIsCharging,
        alternativeBuyerCurrency,
        attemptedPrivateMarketCover,
        buyerFailedToPayOnTime,
        buyerOutstandingPayments,
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
        alternativeCurrencyTurnover,
        alternativeCurrencyPolicy,
      });
    }
    cy.completeAndSubmitCheckYourAnswers();

    cy.completeAndSubmitDeclarations({ hasAntiBriberyCodeOfConduct, exportingWithCodeOfConduct });

    return cy.getReferenceNumber().then((refNumber) => refNumber);
  });
};

export default completeSignInAndSubmitAnApplication;

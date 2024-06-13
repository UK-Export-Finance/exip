import { APPLICATION } from '../../constants';
import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';

/**
 * completeSignInAndSubmitAnApplication
 * 1) Complete "sign in and go to application"
 * 2) Complete and submit all "prepare your application" forms/sections
 * 3) Complete and submit all declarations forms
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - alternativeBuyerCurrency: Should submit an "alternative currency" in the buyer section. Defaults to false.
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 * - policyType: Type of policy. Defaults to "single"
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - hasAntiBriberyCodeOfConduct: Should submit "yes" in the "have a code of conduct" form. Defaults to "yes".
 * - exportingWithCodeOfConduct: Should submit "yes" in the "exporting with code of conduct" form. Defaults to "yes".
 * - policyValueOverMvpMaximum: Should submit an application with a value over the MVP maximum amount. Defaults to false.
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to false.
 * - otherCompanyInvolved: Should submit "yes" to "another company to be insured". Defaults to false
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - needPreCreditPeriod: Should submit "yes" to the "need a pre-credit period" question/form. Defaults to false.
 * - isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to "no".
 * - lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details". Defaults to false.
 * - totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * - attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * - isUsingAgent: Should submit "yes" to "using an agent" form.
 * - agentIsCharging: Should submit "yes" to "agent is charging" in the "agent details" form.
 * - agentChargeMethodFixedSum: Agent charge method is "fixed sum"
 * - hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio.
 * - buyerOutstandingPayments: Exporter has outstanding payments with the buyer
 * - buyerFailedToPayOnTime: Buyer has failed to pay the exporter on the time
 * - fullyPopulatedBuyerTradingHistory: Submit all possible optional "buyer trading history" form fields.
 * - hasHadCreditInsuranceCoverWIthBuyer: Submit "yes" to if export "has held credit insurance cover on the buyer in the past".
 * - exporterHasBuyerFinancialAccounts: Should submit "yes" to the "have buyer financial accounts" form.
 * @return {String} Application reference number
 */
const completeSignInAndSubmitAnApplication = ({
  alternativeBuyerCurrency = false,
  differentTradingName = false,
  differentTradingAddress = false,
  policyType = APPLICATION.POLICY_TYPE.SINGLE,
  exporterHasTradedWithBuyer,
  hasAntiBriberyCodeOfConduct,
  exportingWithCodeOfConduct,
  policyValueOverMvpMaximum = false,
  usingBroker = false,
  otherCompanyInvolved = false,
  differentPolicyContact = false,
  needPreCreditPeriod = false,
  isAppointingLossPayee = false,
  lossPayeeIsLocatedInUK = false,
  totalContractValueOverThreshold = false,
  attemptedPrivateMarketCover = false,
  isUsingAgent = false,
  agentIsCharging = false,
  agentChargeMethodFixedSum = false,
  agentChargeMethodPercentage = false,
  hasConnectionToBuyer = false,
  buyerOutstandingPayments = false,
  buyerFailedToPayOnTime = false,
  fullyPopulatedBuyerTradingHistory = false,
  hasHadCreditInsuranceCoverWIthBuyer = false,
  exporterHasBuyerFinancialAccounts = false,
}) => {
  completeSignInAndGoToApplication({ totalContractValueOverThreshold }).then(({ referenceNumber }) => {
    if (policyType === APPLICATION.POLICY_TYPE.MULTIPLE) {
      cy.completePrepareApplicationMultiplePolicyType({
        alternativeBuyerCurrency,
        differentTradingName,
        differentTradingAddress,
        exporterHasTradedWithBuyer,
        policyValueOverMvpMaximum,
        referenceNumber,
        usingBroker,
        otherCompanyInvolved,
        differentPolicyContact,
        needPreCreditPeriod,
        isAppointingLossPayee,
        lossPayeeIsLocatedInUK,
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover,
        isUsingAgent,
        agentIsCharging,
        agentChargeMethodFixedSum,
        agentChargeMethodPercentage,
        hasConnectionToBuyer,
        buyerOutstandingPayments,
        buyerFailedToPayOnTime,
        fullyPopulatedBuyerTradingHistory,
        hasHadCreditInsuranceCoverWIthBuyer,
        exporterHasBuyerFinancialAccounts,
      });
    } else {
      cy.completePrepareApplicationSinglePolicyType({
        alternativeBuyerCurrency,
        differentTradingName,
        differentTradingAddress,
        exporterHasTradedWithBuyer,
        policyValueOverMvpMaximum,
        referenceNumber,
        usingBroker,
        otherCompanyInvolved,
        differentPolicyContact,
        needPreCreditPeriod,
        isAppointingLossPayee,
        lossPayeeIsLocatedInUK,
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover,
        isUsingAgent,
        agentChargeMethodFixedSum,
        agentChargeMethodPercentage,
        hasConnectionToBuyer,
        buyerOutstandingPayments,
        buyerFailedToPayOnTime,
        fullyPopulatedBuyerTradingHistory,
        hasHadCreditInsuranceCoverWIthBuyer,
        exporterHasBuyerFinancialAccounts,
      });
    }
    cy.completeAndSubmitCheckYourAnswers();

    cy.completeAndSubmitDeclarations({ hasAntiBriberyCodeOfConduct, exportingWithCodeOfConduct });

    return cy.getReferenceNumber().then((refNumber) => refNumber);
  });
};

export default completeSignInAndSubmitAnApplication;

import { APPLICATION } from '../../constants';
import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';

/**
 * completeSignInAndSubmitAnApplication
 * 1) Complete "sign in and go to application"
 * 2) Complete and submit all "prepare your application" forms/sections
 * 3) Complete and submit all declarations forms
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 * - policyType: Type of policy. Defaults to "single"
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - hasAntiBriberyCodeOfConduct: Should submit "yes" in the "have a code of conduct" form. Defaults to "yes".
 * - exportingWithCodeOfConduct: Should submit "yes" in the "exporting with code of conduct" form. Defaults to "yes".
 * - policyValueOverMvpMaximum: should submit an application with a value over the MVP maximum amount. Defaults to false.
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to false.
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 * - totalContractValueOverThreshold: If total contract value in eligibility should be over threshold.
 * - attemptedPrivateMarketCover: Should submit "yes" to "attempted to insure through the private market" form.
 * - isUsingAgent: Should submit "yes" to "using an agent" form.
 * @return {String} Application reference number
 */
const completeSignInAndSubmitAnApplication = ({
  differentTradingAddress = false,
  policyType = APPLICATION.POLICY_TYPE.SINGLE,
  exporterHasTradedWithBuyer,
  hasAntiBriberyCodeOfConduct,
  exportingWithCodeOfConduct,
  policyValueOverMvpMaximum = false,
  usingBroker = false,
  differentPolicyContact = false,
  totalContractValueOverThreshold = false,
  attemptedPrivateMarketCover = false,
  isUsingAgent = false,
}) => {
  completeSignInAndGoToApplication({ totalContractValueOverThreshold }).then(({ referenceNumber }) => {
    if (policyType === APPLICATION.POLICY_TYPE.MULTIPLE) {
      cy.completePrepareApplicationMultiplePolicyType({
        differentTradingAddress,
        exporterHasTradedWithBuyer,
        policyValueOverMvpMaximum,
        referenceNumber,
        usingBroker,
        differentPolicyContact,
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover,
        isUsingAgent,
      });
    } else {
      cy.completePrepareApplicationSinglePolicyType({
        differentTradingAddress,
        exporterHasTradedWithBuyer,
        policyValueOverMvpMaximum,
        referenceNumber,
        usingBroker,
        differentPolicyContact,
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover,
        isUsingAgent,
      });
    }
    cy.completeAndSubmitCheckYourAnswers();

    cy.completeAndSubmitDeclarations({ hasAntiBriberyCodeOfConduct, exportingWithCodeOfConduct });

    return cy.getReferenceNumber().then((refNumber) => refNumber);
  });
};

export default completeSignInAndSubmitAnApplication;

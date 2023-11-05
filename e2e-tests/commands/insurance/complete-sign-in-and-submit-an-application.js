import { APPLICATION } from '../../constants';
import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';

/**
 * completeSignInAndSubmitAnApplication
 * 1) Complete "sign in and go to application"
 * 2) Complete and submit all "prepare your application" forms/sections
 * 3) Complete and submit all declarations forms
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - policyType: Type of policy. Defaults to "single"
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - hasAntiBriberyCodeOfConduct: Should submit "yes" in the "have a code of conduct" form. Defaults to "yes".
 * - exportingWithCodeOfConduct: Should submit "yes" in the "exporting with code of conduct" form. Defaults to "yes".
 * - policyMaximumValue: should submit an application with the maximum value of 500000.  Defaults to false.
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to false.
 * @return {String} Application reference number
 */
const completeSignInAndSubmitAnApplication = ({
  policyType = APPLICATION.POLICY_TYPE.SINGLE,
  exporterHasTradedWithBuyer,
  hasAntiBriberyCodeOfConduct,
  exportingWithCodeOfConduct,
  policyMaximumValue = false,
  usingBroker,
  differentPolicyContact = false,
}) => {
  completeSignInAndGoToApplication({}).then(({ referenceNumber }) => {
    if (policyType === APPLICATION.POLICY_TYPE.MULTIPLE) {
      cy.completePrepareApplicationMultiplePolicyType({
        exporterHasTradedWithBuyer,
        policyMaximumValue,
        referenceNumber,
        usingBroker,
        differentPolicyContact,
      });
    } else {
      cy.completePrepareApplicationSinglePolicyType({
        exporterHasTradedWithBuyer,
        policyMaximumValue,
        referenceNumber,
        usingBroker,
        differentPolicyContact,
      });
    }
    cy.completeAndSubmitCheckYourAnswers();

    cy.completeAndSubmitDeclarations({ hasAntiBriberyCodeOfConduct, exportingWithCodeOfConduct });

    return cy.getReferenceNumber().then((refNumber) => refNumber);
  });
};

export default completeSignInAndSubmitAnApplication;

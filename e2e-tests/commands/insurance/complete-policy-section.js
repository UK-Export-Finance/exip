import { APPLICATION } from '../../constants';

const { POLICY_TYPE } = APPLICATION;

/**
 * completePolicySection
 * Complete the "policy" section
 * @param {Boolean} viaTaskList: Start the "policy" section from the task list.
 * @param {String} policyType: If single or multiple policy - defaults to single
 * @param {Boolean} policyValueOverMvpMaximum: If the value should be over the MVP maximum amount
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {Boolean} sameName: If name on policy is the same as the signed in user - defaults to true
 * @param {Boolean} needPreCreditPeriod: If the user needs a pre-credit period - defaults to false
 * @param {Boolean} usingBroker: If "using broker" - defaults to false
 * @param {Boolean} brokerIsBasedInUk: Broker is based in the UK - defaults to false
 * @param {Boolean} otherCompanyInvolved: Should submit "yes" to "another company to be insured". Defaults to false.
 * @param {Boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to false.
 * @param {Boolean} lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details". Defaults to false.
 * @param {Boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 */
const completePolicySection = ({
  viaTaskList,
  policyType = POLICY_TYPE.SINGLE,
  policyValueOverMvpMaximum = false,
  isoCode,
  alternativeCurrency = false,
  sameName = true,
  needPreCreditPeriod = false,
  usingBroker = false,
  brokerIsBasedInUk = false,
  otherCompanyInvolved = false,
  isAppointingLossPayee = false,
  lossPayeeIsLocatedInUK = false,
  submitCheckYourAnswers = false,
}) => {
  cy.startInsurancePolicySection({ viaTaskList });

  cy.completeAndSubmitPolicyTypeForm({ policyType });

  if (policyType === POLICY_TYPE.SINGLE) {
    cy.completeAndSubmitSingleContractPolicyForm({
      isoCode,
      alternativeCurrency,
    });

    cy.completeAndSubmitTotalContractValueForm({ policyValueOverMvpMaximum });
  } else {
    cy.completeAndSubmitMultipleContractPolicyForm({
      isoCode,
      alternativeCurrency,
    });

    cy.completeAndSubmitExportValueForm({ policyType });
  }

  cy.completeAndSubmitNameOnPolicyForm({ sameName });

  if (!sameName) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod });

  cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved });

  if (otherCompanyInvolved) {
    cy.completeAndSubmitOtherCompanyDetailsForm({});
  }

  cy.completeAndSubmitBrokerForm({ usingBroker });

  if (usingBroker) {
    cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: brokerIsBasedInUk });

    if (brokerIsBasedInUk) {
      cy.completeAndSubmitBrokerAddressesForm({});

      // submit the "confirm broker address" form
      cy.clickSubmitButton();
    }

    // TODO: else - manual address entry
  }

  cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee });

  if (isAppointingLossPayee) {
    cy.completeAndSubmitLossPayeeDetailsForm({
      locatedInUK: lossPayeeIsLocatedInUK,
    });

    if (lossPayeeIsLocatedInUK) {
      cy.completeAndSubmitLossPayeeFinancialDetailsUkForm({});
    } else {
      cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({});
    }
  }

  if (submitCheckYourAnswers) {
    cy.clickSubmitButton();
  }
};

export default completePolicySection;

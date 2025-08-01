import { APPLICATION } from '../../constants';

const { POLICY_TYPE } = APPLICATION;

/**
 * completePolicySection
 * Complete the "policy" section
 * @param {boolean} viaTaskList: Start the "policy" section from the task list.
 * @param {string} policyType: If single or multiple policy - defaults to single
 * @param {boolean} policyValueOverMvpMaximum: If the value should be over the MVP maximum amount
 * @param {string} isoCode: Policy currency ISO code
 * @param {boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {string} maximumBuyerWillOwe: Maximum buyer will owe
 * @param {boolean} sameName: If name on policy is the same as the signed in user - defaults to true
 * @param {boolean} needPreCreditPeriod: If the user needs a pre-credit period - defaults to false
 * @param {boolean} usingBroker: If "using broker" - defaults to false
 * @param {boolean} brokerIsBasedInUk: Broker is based in the UK - defaults to false
 * @param {boolean} multipleBrokerAddressesAvailable: Multiple broker addresses are available from Ordnance Survey
 * @param {boolean} provideBrokerAddressManually: Provide a broker address manually, instead of selecting a result from Ordnance Survey
 * @param {string} brokerBuildingNumberOrName: Broker building name or number
 * @param {string} brokerPostcode: Broker postcode
 * @param {boolean} otherCompanyInvolved: Should submit "yes" to "another company to be insured". Defaults to false.
 * @param {boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee". Defaults to false.
 * @param {boolean} lossPayeeIsLocatedInUK: Should submit "UK" to "loss payee details". Defaults to false.
 * @param {boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 */
const completePolicySection = ({
  viaTaskList,
  policyType = POLICY_TYPE.SINGLE,
  policyValueOverMvpMaximum = false,
  isoCode,
  alternativeCurrency = false,
  maximumBuyerWillOwe,
  sameName = true,
  needPreCreditPeriod = false,
  usingBroker = false,
  brokerIsBasedInUk = false,
  multipleBrokerAddressesAvailable = false,
  provideBrokerAddressManually = false,
  brokerBuildingNumberOrName,
  brokerPostcode,
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

    cy.completeAndSubmitExportValueForm({ maximumBuyerWillOwe });
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
    cy.completeAndSubmitBrokerDetailsForm({
      isBasedInUk: brokerIsBasedInUk,
      buildingNumberOrName: brokerBuildingNumberOrName,
      postcode: brokerPostcode,
    });

    if (brokerIsBasedInUk) {
      if (multipleBrokerAddressesAvailable) {
        cy.completeAndSubmitBrokerAddressesForm({});
      }

      if (provideBrokerAddressManually) {
        cy.clickEnterAddressManuallyLink();

        cy.completeAndSubmitBrokerManualAddressForm({});
      } else {
        // submit the "confirm broker address" form
        cy.clickSubmitButton();
      }
    } else {
      cy.completeAndSubmitBrokerManualAddressForm({});
    }
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

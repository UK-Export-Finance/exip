import { APPLICATION } from '../../../constants';

const { SINGLE } = APPLICATION.POLICY_TYPE;

/**
 * completeAndSubmitPolicyForms
 * completes policy forms up to the specified form to stop at
 * eg, when 'exportValue' is passed, it will complete all forms up to and including 'exportValue'
 * @param {string} stopSubmittingAfter: The final form to submit
 * @param {string} policyType: Single or multiple. Defaults to single.
 * @param {boolean} sameName: if name on policy is the same as the signed in user - defaults to true
 * @param {boolean} usingBroker: Should submit "yes" or "no" to "using a broker"
 * @param {boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee".
 * @param {boolean} locatedInUK: Should submit "UK" to "loss payee details".
 * @param {string} isoCode: Policy currency ISO code
 * @param {boolean} alternativeCurrency: Select the "turnover - alternative currency" option
 * @param {boolean} otherCompanyInvolved: If "another company to be insured" is on.
 * @param {boolean} isBasedInUk: Broker is based in the UK
 * @param {string} postcode: Broker postcode
 * @param {string} buildingNumberOrName: Broker building name or number
 * @param {boolean} multipleBrokerAddressesAvailable: Multiple broker addresses are available from Ordnance Survey
 */
const completeAndSubmitPolicyForms = ({
  stopSubmittingAfter,
  policyType = SINGLE,
  sameName = true,
  usingBroker,
  isAppointingLossPayee,
  locatedInUK,
  isoCode,
  alternativeCurrency,
  otherCompanyInvolved,
  isBasedInUk = true,
  postcode,
  buildingNumberOrName,
  multipleBrokerAddressesAvailable,
}) => {
  cy.startInsurancePolicySection({});

  const steps = [{ name: 'policyType', action: () => cy.completeAndSubmitPolicyTypeForm({ policyType }) }];

  if (policyType === SINGLE) {
    steps.push({
      name: 'singleContractPolicy',
      action: () => cy.completeAndSubmitSingleContractPolicyForm({ isoCode, alternativeCurrency }),
    });
    steps.push({ name: 'totalContractValue', action: () => cy.completeAndSubmitTotalContractValueForm({}) });
  } else {
    steps.push({
      name: 'multipleContractPolicy',
      action: () => cy.completeAndSubmitMultipleContractPolicyForm({ isoCode, alternativeCurrency }),
    });
    steps.push({ name: 'exportValue', action: () => cy.completeAndSubmitExportValueForm({}) });
  }

  steps.push({ name: 'nameOnPolicy', action: () => cy.completeAndSubmitNameOnPolicyForm({ sameName }) });
  steps.push({ name: 'preCreditPeriod', action: () => cy.completeAndSubmitPreCreditPeriodForm({}) });
  steps.push({ name: 'anotherCompany', action: () => cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved }) });
  steps.push({ name: 'broker', action: () => cy.completeAndSubmitBrokerForm({ usingBroker }) });

  if (usingBroker) {
    steps.push({ name: 'brokerDetails', action: () => cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk, postcode, buildingNumberOrName }) });

    if (isBasedInUk) {
      if (multipleBrokerAddressesAvailable) {
        steps.push({ name: 'brokerAddresses', action: () => cy.completeAndSubmitBrokerAddressesForm({ isBasedInUk }) });
      }

      steps.push({ name: 'brokerConfirmAddress', action: () => cy.clickSubmitButton() });
    } else {
      steps.push({ name: 'brokerManualAddress', action: () => cy.completeAndSubmitBrokerManualAddressForm({}) });
    }
  }

  steps.push({ name: 'lossPayee', action: () => cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee }) });

  if (isAppointingLossPayee) {
    steps.push({ name: 'lossPayeeDetails', action: () => cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK }) });
  }

  /**
   * carries out steps in steps array
   * if the step name matches the form to stop at, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === stopSubmittingAfter) {
      break;
    }
  }
};

export default completeAndSubmitPolicyForms;

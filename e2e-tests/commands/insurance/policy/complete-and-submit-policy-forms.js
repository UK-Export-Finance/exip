import { APPLICATION } from '../../../constants';

const { SINGLE } = APPLICATION.POLICY_TYPE;

/**
 * completeAndPolicyForms
 * completes policy forms up to the specified form to stop at
 * eg, when 'exportValue' is passed, it will complete all forms up to and including 'exportValue'
 * @param {String} stopSubmittingAfter: The final form to submit
 * @param {String} policyType: Single or multiple. Defaults to single.
 * @param {Boolean} sameName: if name on policy is the same as the signed in user - defaults to true
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker"
 * @param {Boolean} isAppointingLossPayee: Should submit "yes" or "no" to "appointing a loss payee".
 * @param {Boolean} locatedInUK: Should submit "UK" to "loss payee details".
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "turnover - alternative currency" option
 * @param {Boolean} otherCompanyInvolved: If "another company to be insured" is on.
 * @param {Boolean} isBasedInUk: Broker is based in the UK
 */
const completeAndPolicyForms = ({
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
    steps.push({ name: 'exportValue', action: () => cy.completeAndSubmitExportValueForm({ policyType }) });
  }

  steps.push({ name: 'nameOnPolicy', action: () => cy.completeAndSubmitNameOnPolicyForm({ sameName }) });
  steps.push({ name: 'preCreditPeriod', action: () => cy.completeAndSubmitPreCreditPeriodForm({}) });
  steps.push({ name: 'anotherCompany', action: () => cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved }) });
  steps.push({ name: 'broker', action: () => cy.completeAndSubmitBrokerForm({ usingBroker }) });

  if (usingBroker) {
    steps.push({ name: 'brokerDetails', action: () => cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk }) });

    if (isBasedInUk) {
      steps.push({ name: 'brokerAddresses', action: () => cy.completeAndSubmitBrokerAddressesForm({ isBasedInUk }) });

      steps.push({ name: 'brokerConfirmAddress', action: () => cy.clickSubmitButton() });
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

export default completeAndPolicyForms;

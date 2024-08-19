import { APPLICATION } from '../../../constants';

const { SINGLE } = APPLICATION.POLICY_TYPE;

/**
 * completeAndPolicyForms
 * completes policy forms up to the specified form to stop at
 * eg, when 'exportValue' is passed, it will complete all forms up to and including 'exportValue'
 * @param {String} formToStopAt: the form to stop at
 * @param {String} policyType: the policy type
 * @param {Boolean} sameName: whether the name on the policy is the same as the applicant
 * @param {Boolean} usingBroker: whether the applicant is using a broker
 * @param {Boolean} isAppointingLossPayee: whether the applicant is appointing a loss payee
 * @param {Boolean} locatedInUK: whether the loss payee is located in the UK
 * @param {String} policyIsoCode: the policy ISO code
 * @param {Boolean} policyAlternativeCurrency: the policy alternative currency
 * @param {Boolean} otherCompanyInvolved: whether another company is involved
 */
const completeAndPolicyForms = ({
  formToStopAt,
  policyType = SINGLE,
  sameName = true,
  usingBroker,
  isAppointingLossPayee,
  locatedInUK,
  policyIsoCode,
  policyAlternativeCurrency,
  otherCompanyInvolved,
}) => {
  cy.startInsurancePolicySection({});

  const steps = [{ name: 'policyType', action: () => cy.completeAndSubmitPolicyTypeForm({ policyType }) }];

  if (policyType === SINGLE) {
    steps.push({
      name: 'singleContractPolicy',
      action: () => cy.completeAndSubmitSingleContractPolicyForm({ isoCode: policyIsoCode, alternativeCurrency: policyAlternativeCurrency }),
    });
    steps.push({ name: 'totalContractValue', action: () => cy.completeAndSubmitTotalContractValueForm({}) });
  } else {
    steps.push({
      name: 'multipleContractPolicy',
      action: () => cy.completeAndSubmitMultipleContractPolicyForm({ isoCode: policyIsoCode, alternativeCurrency: policyAlternativeCurrency }),
    });
    steps.push({ name: 'exportValue', action: () => cy.completeAndSubmitExportValueForm({ policyType }) });
  }

  steps.push({ name: 'nameOnPolicy', action: () => cy.completeAndSubmitNameOnPolicyForm({ sameName }) });
  steps.push({ name: 'preCreditPeriod', action: () => cy.completeAndSubmitPreCreditPeriodForm({}) });
  steps.push({ name: 'anotherCompany', action: () => cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved }) });
  steps.push({ name: 'broker', action: () => cy.completeAndSubmitBrokerForm({ usingBroker }) });

  if (usingBroker) {
    steps.push({ name: 'brokerDetails', action: () => cy.completeAndSubmitBrokerDetailsForm({}) });
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

    if (step.name === formToStopAt) {
      break;
    }
  }
};

export default completeAndPolicyForms;

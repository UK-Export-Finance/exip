/**
 * completeAndSubmitYourBusinessForms
 * completes your business forms up to the specified form to stop at
 * eg, when 'turnover' is passed, it will complete all forms up to and including 'turnover'
 * @param {String} formToStopAt: the form to stop at
 * @param {Boolean} hasCreditControlProcess: whether the exporter has a credit control process
 * @param {Boolean} differentTradingAddress: whether the exporter has a different trading address
 */
const completeAndSubmitYourBusinessForms = ({ formToStopAt, hasCreditControlProcess, differentTradingAddress }) => {
  cy.startYourBusinessSection({});

  const steps = [{ name: 'companyDetails', action: () => cy.completeAndSubmitCompanyDetails({ differentTradingAddress }) }];

  if (differentTradingAddress) {
    steps.push({ name: 'alternativeTradingAddress', action: () => cy.completeAndSubmitAlternativeTradingAddressForm({}) });
  }

  steps.push({ name: 'natureOfYourBusiness', action: () => cy.completeAndSubmitNatureOfYourBusiness() });
  steps.push({ name: 'turnover', action: () => cy.completeAndSubmitTurnoverForm({}) });
  steps.push({ name: 'creditControl', action: () => cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess }) });

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

export default completeAndSubmitYourBusinessForms;

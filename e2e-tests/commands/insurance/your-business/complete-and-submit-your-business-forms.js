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

  const initialSteps = [{ name: 'companyDetails', action: () => cy.completeAndSubmitCompanyDetails({ differentTradingAddress }) }];

  if (differentTradingAddress) {
    initialSteps.push({ name: 'alternativeTradingAddress', action: () => cy.completeAndSubmitAlternativeTradingAddressForm({}) });
  }

  const steps = [
    ...initialSteps,
    { name: 'natureOfYourBusiness', action: () => cy.completeAndSubmitNatureOfYourBusiness() },
    { name: 'turnoverCurrency', action: () => cy.completeAndSubmitAlternativeCurrencyForm({}) },
    { name: 'turnover', action: () => cy.completeAndSubmitTurnoverForm({}) },
    { name: 'creditControl', action: () => cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess }) },
  ];

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

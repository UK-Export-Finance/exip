/**
 * completeAndSubmitYourBusinessForms
 * completes your business forms up to the specified form to stop at
 * eg, when 'turnover' is passed, it will complete all forms up to and including 'turnover'
 * @param {String} stopSubmittingAfter: The final form to submit
 * @param {Boolean} hasCreditControlProcess: whether the exporter has a credit control process
 * @param {Boolean} differentTradingAddress: whether the exporter has a different trading address
 * @param {Boolean} differentTradingName: whether the exporter has a different trading name
 */
const completeAndSubmitYourBusinessForms = ({ stopSubmittingAfter, hasCreditControlProcess, differentTradingAddress, differentTradingName }) => {
  cy.startYourBusinessSection({});

  const initialSteps = [{ name: 'companyDetails', action: () => cy.completeAndSubmitCompanyDetails({ differentTradingAddress, differentTradingName }) }];

  if (differentTradingAddress) {
    initialSteps.push({ name: 'alternativeTradingAddress', action: () => cy.completeAndSubmitAlternativeTradingAddressForm({}) });
  }

  const steps = [
    ...initialSteps,
    { name: 'natureOfYourBusiness', action: () => cy.completeAndSubmitNatureOfYourBusiness() },
    { name: 'turnoverCurrency', action: () => cy.completeAndSubmitCurrencyForm({}) },
    { name: 'turnover', action: () => cy.completeAndSubmitTurnoverForm() },
    { name: 'creditControl', action: () => cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess }) },
  ];

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

export default completeAndSubmitYourBusinessForms;

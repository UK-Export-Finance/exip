/**
 * completeAndSubmitYourBuyerForms
 * completes your buyer forms up to the specified form to stop at
 * eg, when 'connectionWithTheBuyer' is passed, it will complete all forms up to and including 'connectionWithTheBuyer'
 * @param {String} formToStopAt: the form to stop at
 * @param {Boolean} viaTaskList: whether to complete the section via the task list
 * @param {Boolean} hasConnectionToBuyer: whether the exporter has a connection with the buyer
 * @param {Boolean} exporterHasTradedWithBuyer: whether the exporter has traded with the buyer
 * @param {Boolean} outstandingPayments: whether the exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: whether the buyer has failed to pay the exporter
 * @param {Boolean} fullyPopulatedBuyerTradingHistory: whether to fully populate the buyer trading history form
 * @param {Boolean} exporterHasBuyerFinancialAccounts: whether the exporter has buyer financial accounts
 */
const completeAndSubmitYourBuyerForms = ({
  formToStopAt,
  viaTaskList,
  hasConnectionToBuyer,
  exporterHasTradedWithBuyer,
  outstandingPayments,
  failedToPay,
  fullyPopulatedBuyerTradingHistory,
  exporterHasBuyerFinancialAccounts,
}) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  const steps = [
    { name: 'companyOrOrganisation', action: () => cy.completeAndSubmitCompanyOrOrganisationForm({}) },
    { name: 'connectionWithTheBuyer', action: () => cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer }) },
    { name: 'tradedWithBuyer', action: () => cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer }) },
  ];

  /**
   * if exporterHasTradedWithBuyer
   * add tradingHistoryWithBuyer step after tradedWithBuyer
   */
  if (exporterHasTradedWithBuyer) {
    steps.push({
      name: 'tradingHistoryWithBuyer',
      action: () =>
        cy.completeAndSubmitTradingHistoryWithBuyerForm({
          outstandingPayments: outstandingPayments || fullyPopulatedBuyerTradingHistory,
          failedToPay: failedToPay || fullyPopulatedBuyerTradingHistory,
        }),
    });
  }

  steps.push({ name: 'buyerFinancialInformation', action: () => cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts }) });

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

export default completeAndSubmitYourBuyerForms;

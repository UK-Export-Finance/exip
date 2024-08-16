/**
 * completeAndSubmitYourBuyerForms
 * completes your buyer forms up to the specified section
 * eg, when 'connectionWithTheBuyer' is passed, it will complete all forms up to and including 'connectionWithTheBuyer'
 * @param {String} form: the form to complete
 * @param {Boolean} viaTaskList: whether to complete the section via the task list
 * @param {Boolean} hasConnectionToBuyer: whether the exporter has a connection with the buyer
 * @param {Boolean} exporterHasTradedWithBuyer: whether the exporter has traded with the buyer
 * @param {Boolean} outstandingPayments: whether the exporter has outstanding payments with the buyer
 * @param {Boolean} failedToPay: whether the buyer has failed to pay the exporter
 * @param {Boolean} fullyPopulatedBuyerTradingHistory: whether to fully populate the buyer trading history form
 * @param {Boolean} exporterHasBuyerFinancialAccounts: whether the exporter has buyer financial accounts
 */
const completeAndSubmitYourBuyerForms = ({
  form,
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
    { name: 'buyerFinancialInformation', action: () => cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts }) },
  ];

  /**
   * if exporterHasTradedWithBuyer
   * add tradingHistoryWithBuyer step after tradedWithBuyer (using splice)
   */
  if (exporterHasTradedWithBuyer) {
    steps.splice(3, 0, {
      name: 'tradingHistoryWithBuyer',
      action: () =>
        cy.completeAndSubmitTradingHistoryWithBuyerForm({
          outstandingPayments: outstandingPayments || fullyPopulatedBuyerTradingHistory,
          failedToPay: failedToPay || fullyPopulatedBuyerTradingHistory,
        }),
    });
  }

  /**
   * carries out steps in steps array
   * if the step name matches the section, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();
    if (step.name === form) {
      break;
    }
  }
};

export default completeAndSubmitYourBuyerForms;

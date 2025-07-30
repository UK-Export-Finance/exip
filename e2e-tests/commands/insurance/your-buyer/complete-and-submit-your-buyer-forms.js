/**
 * completeAndSubmitYourBuyerForms
 * completes your buyer forms up to the specified form to stop at
 * eg, when 'connectionWithTheBuyer' is passed, it will complete all forms up to and including 'connectionWithTheBuyer'
 * @param {boolean} alternativeCurrency: If alternative currency should be entered.
 * @param {boolean} exporterHasTradedWithBuyer: whether the exporter has traded with the buyer
 * @param {boolean} failedToPay: whether the buyer has failed to pay the exporter
 * @param {string} stopSubmittingAfter: The final form to submit
 * @param {boolean} fullyPopulatedBuyerTradingHistory: whether to fully populate the buyer trading history form
 * @param {boolean} hasConnectionToBuyer: whether the exporter has a connection with the buyer
 * @param {boolean} exporterHasBuyerFinancialAccounts: whether the exporter has buyer financial accounts
 * @param {string} isoCode: Policy currency ISO code
 * @param {boolean} outstandingPayments: whether the exporter has outstanding payments with the buyer
 * @param {boolean} viaTaskList: whether to complete the section via the task list
 */
const completeAndSubmitYourBuyerForms = ({
  alternativeCurrency,
  exporterHasTradedWithBuyer,
  failedToPay,
  stopSubmittingAfter,
  fullyPopulatedBuyerTradingHistory,
  exporterHasBuyerFinancialAccounts,
  hasConnectionToBuyer,
  isoCode,
  outstandingPayments,
  viaTaskList,
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
      action: () => cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: outstandingPayments || fullyPopulatedBuyerTradingHistory }),
    });

    if (outstandingPayments) {
      steps.push({
        name: 'currencyOfLatePayments',
        action: () => cy.completeAndSubmitCurrencyForm({ isoCode, alternativeCurrency }),
      });
      steps.push({ name: 'outstandingOrOverduePayments', action: () => cy.completeAndSubmitOutstandingOrOverduePaymentsForm({ outstandingPayments }) });
    }

    steps.push({ name: 'failedToPay', action: () => cy.completeAndSubmitFailedToPayForm({ failedToPay }) });
  }

  steps.push({ name: 'buyerFinancialInformation', action: () => cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts }) });

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

export default completeAndSubmitYourBuyerForms;
